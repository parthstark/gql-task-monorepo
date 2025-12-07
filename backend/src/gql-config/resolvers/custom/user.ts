import { db } from "../../../db";
import { User } from "../../../models";

export const userResolvers = {
  User: {
    boards: (parent: User) =>
      db.data!.boards.filter((b) => b.ownerId === parent.id),
    tasks: (parent: User) =>
      db.data!.tasks.filter((t) => t.assigneeId === parent.id),
  },
};
