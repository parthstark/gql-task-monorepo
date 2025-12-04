import { UserInputError } from "apollo-server";
import { db } from "../../../db";

export const updateTask = async (
  _: any,
  {
    taskKey,
    title,
    description,
    status,
    assigneeEmail,
  }: {
    taskKey: string;
    title?: string;
    description?: string;
    status?: "TODO" | "IN_PROGRESS" | "DONE";
    assigneeEmail?: string;
  }
) => {
  const task = db.data!.tasks.find((t) => t.key === taskKey);
  if (!task) {
    throw new UserInputError(`Task with key "${taskKey}" does not exist.`);
  }

  if (assigneeEmail !== undefined) {
    if (assigneeEmail) {
      const assignee = db.data!.users.find((u) => u.email === assigneeEmail);
      if (!assignee) {
        throw new UserInputError(`User with email "${assigneeEmail}" does not exist.`);
      }
      task.assigneeId = assignee.id;
    } else {
      task.assigneeId = undefined;
    }
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  
  task.updatedAt = new Date().toISOString();
  
  await db.write();
  return task;
};