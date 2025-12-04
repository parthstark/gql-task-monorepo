import { userResolvers } from "./custom/user";
import { boardResolvers } from "./custom/board";
import { taskResolvers } from "./custom/task";
import { commentResolvers } from "./custom/comment";
import { db } from "../../db";
import { addUser } from "./mutations/addUser";
import { addBoard } from "./mutations/addBoard";
import { addComment } from "./mutations/addComment";
import { addTask } from "./mutations/addTask";
import { updateTask } from "./mutations/updateTask";

export const resolvers = {
  ...userResolvers,
  ...boardResolvers,
  ...taskResolvers,
  ...commentResolvers,

  Query: {
    users: () => db.data!.users,
    user: (_: any, { email }: { email: string }) =>
      db.data!.users.find((u) => u.email === email),

    boards: () => db.data!.boards,
    board: (_: any, { key }: { key: string }) =>
      db.data!.boards.find((b) => b.key === key),

    tasks: () => db.data!.tasks,
    task: (_: any, { key }: { key: string }) =>
      db.data!.tasks.find((t) => t.key === key),
  },

  Mutation: {
    addBoard,
    addComment,
    addTask,
    addUser,
    updateTask,
  },
};
