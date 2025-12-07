import { gql } from '@apollo/client';

export const ADD_SUBTASK = gql`
  mutation AddSubtask(
    $title: String!
    $boardKey: String!
    $parentTaskKey: String!
    $assigneeEmail: String
  ) {
    addTask(
      title: $title
      boardKey: $boardKey
      parentTaskKey: $parentTaskKey
      assigneeEmail: $assigneeEmail
    ) {
      id
      key
      title
      status
    }
  }
`;
