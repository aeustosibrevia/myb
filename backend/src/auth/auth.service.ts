import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { users } from '../data/data';
import { User } from '../user/user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { generateId } from '../utils/id';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async register(dto: { username: string; email: string; password: string }) {
    const exists = users.find(u => u.email === dto.email);
    if (exists) throw new BadRequestException('User already exists');

    const user = new User();
    user.id = generateId();
    user.username = dto.username;
    user.email = dto.email;
    user.password_hash = await bcrypt.hash(dto.password, 10);
    user.created_at = new Date();
    user.xp = 0;
    user.current_rank_id = 1;
    user.is_card_verified = false;

    users.push(user);

    return { message: "Registered successfully" };
  }

  async login(dto: { email: string; password: string }) {
    const user = users.find(u => u.email === dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(dto.password, user.password_hash);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwt.sign({ id: user.id, email: user.email });

    return { token };
  }

  validateToken(token: string) {
    try {
      return this.jwt.verify(token);
    } catch {
      return null;
    }
  }
}
