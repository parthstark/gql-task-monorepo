import { gql } from '@apollo/client';

export const ADD_COMMENT = gql`
  mutation AddComment(
    $taskKey: String!
    $authorEmail: String!
    $text: String!
  ) {
    addComment(taskKey: $taskKey, authorEmail: $authorEmail, text: $text) {
      id
      text
      author {
        id
        name
        email
      }
    }
  }
`;
