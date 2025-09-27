import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from '@/shared/api';

@Injectable()
export class SessionService {
  constructor(private readonly redisService: RedisService) {}

  async createForUser(user: any) {
    return this.redisService.createSession(user);
  }

  async destroyByToken(token: string) {
   	const sessionId = await this.redisService.get(`session_token:${token}`);
    if (!sessionId) throw new NotFoundException('Session not found');

    await this.redisService.del(`sessions:${sessionId}`);
    await this.redisService.del(`user_sessions:${sessionId}`);
    await this.redisService.del(`session_token:${token}`);

    return true;
  }
}
