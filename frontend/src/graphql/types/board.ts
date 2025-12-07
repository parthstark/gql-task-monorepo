import { Task } from './task';
import { User } from './user';

export interface Board {
  id: string;
  title: string;
  key: string;
  description?: string;
  owner: User;
  tasks: Task[];
}
