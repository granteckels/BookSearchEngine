import User from "../models/User.js"
import { signToken } from '../services/auth.js';

interface Login {
    email: string,
    password: string
}

interface AddUser {
    username: string,
    email: string,
    password: string
}

interface BookInput {
    bookId: number
    authors: [string]
    description: string
    title: string
    image: string
    link: string
}

interface SaveBook {
    book: BookInput
}

interface RemoveBook {
    bookId: string
}

const resolvers = {
    Query: {
        me: async (_: unknown, __: unknown, context: any) => {
            return await User.findById(context.user._id);
        }
    },
    Mutation: {
        login: async(_: unknown, { email, password }: Login) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("No user found with this email.");
            }

            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new Error("Incorrect password.");
            }

            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        addUser: async(_: unknown, { username, email, password }: AddUser) => {
            const user = await User.create({ username, email, password });

            const token = signToken(user.username, user.password, user._id);
            
            return { token, user };
        },
        saveBook: async(_: unknown, { book }: SaveBook, context: any) => {
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: book } },
                { new: true, runValidators: true }
            );
        },
        removeBook: async(_: unknown, { bookId }: RemoveBook, context: any) => {
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );
        }
    }
}

export default resolvers