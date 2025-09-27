import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { hash, verify } from 'argon2'

import { PrismaService } from '@/shared/api/prisma/prisma.service'
import { RedisService } from '@/shared/api/redis/redis.service'

import { CreateUserRequest, SigninRequest } from './dto'
import { UserService } from '@/shared/services/user/user.services'
import { SessionService } from '@/shared/services/session/session.service'

@Injectable()
export class CredentialsService {
	public constructor(
		private readonly userService: UserService,
		private readonly sessionService: SessionService
	) {}

	public async create(dto: CreateUserRequest) {
		const exists = await this.userService.findByLogin(dto.email);
		if (exists) throw new ConflictException('Пользователь уже существует');

		const user = await this.userService.createUserWithProfile(dto);
		return this.sessionService.createForUser(user);
 	}

  	public async login(dto: SigninRequest) {
		const user = await this.userService.findByLogin(dto.username);
		const isValid = await verify(user.password, dto.password);
		if (!isValid) throw new UnauthorizedException('Неверные данные');

		return { session: await this.sessionService.createForUser(user), user };
 	}

	public async logout(token: string) {
		return this.sessionService.destroyByToken(token);
	}
}
