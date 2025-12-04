import { db } from "../../../db";
import { Task } from "../../../models";

export const taskResolvers = {
  Task: {
    board: (parent: Task) =>
      db.data!.boards.find((b) => b.id === parent.boardId),
    assignee: (parent: Task) =>
      db.data!.users.find((u) => u.id === parent.assigneeId),
    comments: (parent: Task) =>
      db.data!.comments.filter((c) => c.taskId === parent.id),
    subTasks: (parent: Task) =>
      db.data!.tasks.filter((t) => t.parentTaskId === parent.id),
  },
};
