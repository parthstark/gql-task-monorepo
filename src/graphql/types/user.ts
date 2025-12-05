import { Board } from './board';
import { Task } from './task';

export interface User {
  id: string;
  name: string;
  email: string;
  boards?: Board[];
  tasks?: Task[];
}
