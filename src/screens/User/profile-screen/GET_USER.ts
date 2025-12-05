import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($email: String!) {
    user(email: $email) {
      id
      name
      email
      boards {
        id
        title
        key
      }
      tasks {
        id
        key
        title
        status
        board {
          id
          title
        }
      }
    }
  }
`;
