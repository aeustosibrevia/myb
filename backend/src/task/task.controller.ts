import { Controller, Post, Body } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() body: { userId: number; title: string; description?: string; advice?: string }) {
    return this.taskService.createTask(body.userId, body.title, body.description, body.advice);
  }
}
