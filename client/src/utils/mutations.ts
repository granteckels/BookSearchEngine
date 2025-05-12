import { gql } from "@apollo/client";

export const MUTATION_ADDUSER = gql`
    mutation addUser($username: String, $email: String, $password: String) {
        addUser(username: $username, email: $email, password: $password) {
            token
        }
    }`