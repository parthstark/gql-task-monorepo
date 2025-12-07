export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Board {
  id: string;
  title: string;
  key: string;
  ownerId: string;
  description?: string;
  taskCounter: number;
  createdAt: string;
}

export interface Task {
  id: string;
  key: string;
  boardId: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  assigneeId?: string;
  parentTaskId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface DBData {
  users: User[];
  boards: Board[];
  tasks: Task[];
  comments: Comment[];
}
