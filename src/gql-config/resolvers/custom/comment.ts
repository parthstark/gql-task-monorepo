import { db } from "../../../db";
import { Comment } from "../../../models";

export const commentResolvers = {
  Comment: {
    text: (parent: Comment) => parent.text,
    author: (parent: Comment) =>
      db.data!.users.find((u) => u.id === parent.userId),
    task: (parent: Comment) =>
      db.data!.tasks.find((t) => t.id === parent.taskId),
  },
};
