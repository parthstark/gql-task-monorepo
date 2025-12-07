import { gql } from '@apollo/client';

export const GET_ALL_BOARDS = gql`
  query GetAllBoards {
    boards {
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
      }
    }
  }
`;
