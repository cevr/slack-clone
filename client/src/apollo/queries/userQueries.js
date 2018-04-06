import gql from 'graphql-tag';

export const ALL_USERS_QUERY = gql`
    {
        allUsers {
            id
            username
            email
        }
    }
`;
