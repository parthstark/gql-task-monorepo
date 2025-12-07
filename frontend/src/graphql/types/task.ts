import { User } from './user';
import { Comment } from './comment';
import { Board } from './board';

export interface Task {
  id: string;
  key: string;
  title: string;
  description?: string;
  status: string;
  board: Board;
  assignee?: User;
  comments: Comment[];
  subTasks: Task[];
}
