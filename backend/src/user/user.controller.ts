import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: any) {
    const user = UserService.getById(req.user.id);
    if (!user) return { message: "User not found" };
    return user;
  }
}
