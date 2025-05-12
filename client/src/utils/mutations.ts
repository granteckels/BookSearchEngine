import { gql } from "@apollo/client";

export const MUTATION_LOGIN = gql`
    mutation login($email: String, $password: String) {
        login(email: $email, password: $password) {
            token
            user {
                username
                email
            }
        }
    }
`

export const MUTATION_ADDUSER = gql`
    mutation addUser($username: String, $email: String, $password: String) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                username
                email
            }
        }
    }
`