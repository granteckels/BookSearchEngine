import { gql } from "@apollo/client";

export const QUERY_ME = gql`
    query Me($id: ID) {
        me(id: $id) {
            username,
            email
        }
    }`