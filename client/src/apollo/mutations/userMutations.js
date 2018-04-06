import gql from 'graphql-tag';

export const REGISTER_USER = gql`
    mutation($email: String, $username: String, $password: String) {
        register(email: $email, username: $username, password: $password) {
            successful
            user {
                id
                username
                email
            }
            errors {
                path
                message
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation($email: String, $password: String) {
        login(email: $email, password: $password) {
            successful
            token
            refreshToken
            errors {
                path
                message
            }
        }
    }
`;
