import { User } from "../user/user.model";
import { Task } from "../task/task.model";
import { Payment } from "../payment/payment.model";
import { UserMessage } from "../user-message/user-message.model";
import { Rank } from "../rank/rank.model";

export const users: User[] = [];
export const tasks: Task[] = [];
export const payments: Payment[] = [];
export const ranks: Rank[] = [
  { id: 1, name: "Iron", xp_required: 0 },
  { id: 2, name: "Bronze", xp_required: 100 },
  { id: 3, name: "Silver", xp_required: 200 },
  { id: 4, name: "Gold", xp_required: 600 },
  { id: 5, name: "Diamond", xp_required: 1000 },
];
export const messages: UserMessage[] = [];
