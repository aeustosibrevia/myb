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
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    @Get('user/:userId')
    getAllByUser(@Param('userId') userId: string) {
        return TaskService.getAllByUser(Number(userId));
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        const task = TaskService.getById(Number(id));
        if (!task) throw new NotFoundException('Task not found');
        return task;
    }

    @Post()
    create(@Body() body: any) {
        if (!body.user_id || !body.title || !body.deadline) {
            throw new BadRequestException('Missing required fields');
        }

        return TaskService.create(body);
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
