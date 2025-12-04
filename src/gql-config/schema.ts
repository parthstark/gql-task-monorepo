import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    boards: [Board!]
    tasks: [Task!]
  }

  type Board {
    id: ID!
    title: String!
    key: String!
    description: String
    owner: User!
    tasks: [Task!]!
  }

  type Task {
    id: ID!
    key: String!
    title: String!
    description: String
    status: String!
    board: Board!
    assignee: User
    comments: [Comment!]!
    subTasks: [Task!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    task: Task!
  }

  type Query {
    users: [User!]!
    user(email: String!): User

    boards: [Board!]!
    board(key: String!): Board

    tasks: [Task!]!
    task(key: String!): Task
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    addBoard(
      title: String!
      key: String!
      description: String
      ownerEmail: String!
    ): Board
    addTask(
      title: String!
      boardKey: String!
      assigneeEmail: String
      parentTaskKey: String
    ): Task
    addComment(taskKey: String!, authorEmail: String!, text: String!): Comment

    updateTask(
      taskKey: String!
      title: String
      description: String
      status: String
      assigneeEmail: String
    ): Task
  }
`;
