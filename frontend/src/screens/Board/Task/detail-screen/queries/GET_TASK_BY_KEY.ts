import { gql } from '@apollo/client';

export const GET_TASK_BY_KEY = gql`
  query GetTask($key: String!) {
    task(key: $key) {
      id
      key
      title
      description
      status
      assignee {
        id
        name
        email
      }
      board {
        id
        key
        title
      }
      subTasks {
        id
        key
        title
        status
      }
      comments {
        id
        text
        author {
          id
          name
          email
        }
      }
    }
  }
`;
