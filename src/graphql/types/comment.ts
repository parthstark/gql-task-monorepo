import { Task } from './task';
import { User } from './user';

export interface Comment {
  id: string;
  text: string;
  author: User;
  task: Task;
}
