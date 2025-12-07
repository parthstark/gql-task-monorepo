import { gql } from '@apollo/client';

export const ADD_BOARD = gql`
  mutation AddBoard($title: String!, $key: String!, $description: String, $ownerEmail: String!) {
    addBoard(title: $title, key: $key, description: $description, ownerEmail: $ownerEmail) {
      id
      title
      key
      description
    }
  }
`;