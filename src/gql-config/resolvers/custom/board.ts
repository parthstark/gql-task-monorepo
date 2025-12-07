import { db } from "../../../db";
import { Board } from "../../../models";

export const boardResolvers = {
  Board: {
    owner: (parent: Board) =>
      db.data!.users.find((u) => u.id === parent.ownerId),
    tasks: (parent: Board) =>
      db.data!.tasks.filter((t) => t.boardId === parent.id),
  },
};
