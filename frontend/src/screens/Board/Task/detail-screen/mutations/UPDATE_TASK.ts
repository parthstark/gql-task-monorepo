import { gql } from '@apollo/client';

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $taskKey: String!
    $title: String
    $description: String
    $status: String
    $assigneeEmail: String
  ) {
    updateTask(
      taskKey: $taskKey
      title: $title
      description: $description
      status: $status
      assigneeEmail: $assigneeEmail
    ) {
      id
      key
      title
      description
      status
    }
  }
`;
