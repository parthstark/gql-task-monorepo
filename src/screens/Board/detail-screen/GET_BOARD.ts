import { gql } from '@apollo/client';

export const GET_BOARD = gql`
  query GetBoard($key: String!) {
    board(key: $key) {
      id
      title
      key
      description
      owner {
        id
        name
      }
      tasks {
        id
        key
        title
        status
        assignee {
          id
          name
        }
        comments {
          id
          text
        }
      }
    }
  }
`;
