import { Injectable } from '@nestjs/common';
import { tasks, userMessages } from '../data/data';
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
}
