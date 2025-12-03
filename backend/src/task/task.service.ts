import { tasks } from "../data/data";
import { Task } from "./task.model";
import { generateId } from "../utils/id";

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
    return task;
  }

  static fail(id: number): Task | undefined {
    const task = tasks.find(t => t.id === id);
    if (!task) return undefined;

    task.status = "failed";
    return task;
  }
}
