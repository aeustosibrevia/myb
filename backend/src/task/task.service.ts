import { Injectable, NotFoundException } from '@nestjs/common';
import { tasks, userMessages, users } from '../data/data';
import { Task } from './task.model';
import { UserMessage } from '../user-message/user-message.model';

@Injectable()
export class TaskService {
  private taskIdCounter = 1;
  private messageIdCounter = 1;

  createTask(userId: number, title: string, description?: string, advice?: string): Task {
    const newTask: Task = {
      id: this.taskIdCounter++,
      userId,
      title,
      description,
      status: 'pending',
      createdAt: new Date(),
    };
    tasks.push(newTask);

    if (advice) {
      const message: UserMessage = {
        id: this.messageIdCounter++,
        userId,
        type: 'advice',
        message: advice,
        createdAt: new Date(),
      };
      userMessages.push(message);
    }

    return newTask;
  }

  completeTask(taskId: number): Task {
    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.status === 'completed') {
      return task;
    }

    task.status = 'completed';
    task.completedAt = new Date();

    const user = users.find((u) => u.id === task.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.xp += 10;
    user.streakDays += 1;

    const oldRank = user.currentRankId;
    const newRank = this.calculateRank(user.xp);

    if (newRank !== oldRank) {
      user.currentRankId = newRank;

      userMessages.push({
        id: this.messageIdCounter++,
        userId: user.id,
        type: 'motivation',
        message: `Вітаємо! Ти отримав новий ранг: ${newRank}`,
        createdAt: new Date(),
      });
    }

    userMessages.push({
      id: this.messageIdCounter++,
      userId: user.id,
      type: 'motivation',
      message: 'Ти виконав задачу',
      createdAt: new Date(),
    });

    return task;
  }

  // Simple logic. Change later
  private calculateRank(xp: number): number {
    if (xp > 200) return 4;
    if (xp > 100) return 3;
    if (xp > 50) return 2;
    return 1;
  }
}
