import { Task } from '../task/task.model';
import { UserMessage } from '../user-message/user-message.model';
import { User } from '../user/user.model';

export const tasks: Task[] = [];
export const userMessages: UserMessage[] = [];
export const users: User[] = [
  { id: 1, name: 'Andrii', xp: 0, streakDays: 0, currentRankId: 1 },
];
