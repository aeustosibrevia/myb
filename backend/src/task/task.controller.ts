import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Patch,
  BadRequestException,
  NotFoundException,
  UseGuards,
  Req
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';

@Controller('tasks')
export class TaskController {

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMyTasks(@Req() req) {
    return TaskService.getAllByUser(req.user.id);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    const task = TaskService.getById(Number(id));
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() body: any) {
    if (!body.title || !body.deadline) {
      throw new BadRequestException('Missing required fields');
    }

    return TaskService.create({
      user_id: req.user.id,
      title: body.title,
      description: body.description,
      deadline: body.deadline,
      difficulty: body.difficulty,
      cost_if_failed: body.cost_if_failed,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    const updated = TaskService.update(Number(id), body);
    if (!updated) throw new NotFoundException('Task not found');
    return updated;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const success = TaskService.delete(Number(id));
    if (!success) throw new NotFoundException('Task not found');
    return { message: 'Task deleted' };
  }

  @Post(':id/complete')
  complete(@Param('id') id: string) {
    const task = TaskService.complete(Number(id));
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Post(':id/fail')
  fail(@Param('id') id: string) {
    const task = TaskService.fail(Number(id));
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
}
