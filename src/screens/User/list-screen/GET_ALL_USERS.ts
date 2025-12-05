import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;
