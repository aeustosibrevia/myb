import { tasks, users, ranks } from "../data/data";
import { Task } from "./task.model";
import { generateId } from "../utils/id";

const XP_GAIN = { 1: 5, 2: 10, 3: 15, 4: 20, 5: 25 };
const XP_LOSS = { 1: 25, 2: 20, 3: 15, 4: 10, 5: 5 };

export class TaskService {
  static getAllByUser(user_id: number): Task[] {
    return tasks.filter(t => t.user_id === user_id);
  }

  static getById(id: number): Task | undefined {
    return tasks.find(t => t.id === id);
  }

  static create(data: {
    user_id: number;
    title: string;
    description: string;
    deadline: Date;
    difficulty: number;
    cost_if_failed: number;
  }): Task {
    const task = new Task();
    task.id = generateId();
    task.user_id = data.user_id;
    task.title = data.title;
    task.description = data.description;
    task.deadline = data.deadline;
    task.created_at = new Date();
    task.difficulty = data.difficulty;
    task.cost_if_failed = data.cost_if_failed;
    task.status = "pending";

    tasks.push(task);
    return task;
  }

  static update(id: number, data: Partial<Omit<Task, "id" | "user_id" | "created_at">>): Task | undefined {
    const task = tasks.find(t => t.id === id);
    if (!task) return undefined;

    Object.assign(task, data);
    return task;
  }

  static delete(id: number): boolean {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;

    tasks.splice(index, 1);
    return true;
  }

  static complete(id: number): Task | undefined {
    const task = tasks.find(t => t.id === id);
    if (!task) return undefined;

    task.status = "completed";
    this.updateUserXp(task.user_id, XP_GAIN[task.difficulty]);
    return task;
  }

  static fail(id: number): Task | undefined {
    const task = tasks.find(t => t.id === id);
    if (!task) return undefined;

    task.status = "failed";
    this.updateUserXp(task.user_id, -XP_LOSS[task.difficulty]);
    return task;
  }

  private static updateUserXp(user_id: number, xpChange: number) {
    const user = users.find(u => u.id === user_id);
    if (!user) return;

    user.xp += xpChange;
    if (user.xp < 0) user.xp = 0;

    user.current_rank_id = this.calculateRank(user.xp);
  }

  private static calculateRank(xp: number): number {
    let rankId = 1;
    for (const rank of ranks) {
      if (xp >= rank.xp_required) rankId = rank.id;
      else break;
    }
    return rankId;
  }
}
