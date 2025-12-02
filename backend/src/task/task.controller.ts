import { Controller, Post, Patch, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() body: { userId: number; title: string; description?: string; advice?: string }) {
    return this.taskService.createTask(body.userId, body.title, body.description, body.advice);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.taskService.completeTask(Number(id));
  }
}
