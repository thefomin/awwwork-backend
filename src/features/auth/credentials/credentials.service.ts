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

@Injectable()
export class CredentialsService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly redisService: RedisService
	) {}

	public async findByEmailOrUsername(login: string) {
		const user = await this.prismaService.user.findFirst({
			where: {
				OR: [{ email: login }, { username: login }]
			},
			include: {
				externalAccounts: true
			}
		})

		return user
	}

	public async create(dto: CreateUserRequest) {
		const isExists = await this.findByEmailOrUsername(dto.email)

		if (isExists) {
			throw new ConflictException('Такой пользователь уже существует')
		}
		const user = await this.prismaService.user.create({
			data: {
				username: dto.username.replace(/[^a-zA-Z0-9_]/g, ''),
				email: dto.email,
				password: await hash(dto.password)
			},
			include: {
				externalAccounts: true
			}
		})

		await this.prismaService.userProfile.create({
			data: {
				userId: user.id,
				username: user.username
			}
		})
		const session = await this.redisService.createSession(user)

		return session
	}

	public async login(dto: SigninRequest) {
		const user = await this.findByEmailOrUsername(dto.username)

		const isValidPassword = await verify(user.password, dto.password)

		if (!isValidPassword) {
			throw new UnauthorizedException(
				'Неверные данные. Пожалуйста, попробуйте еще раз или восстановите пароль, если забыли его.'
			)
		}

		const session = await this.redisService.createSession(user)

		return { session, user }
	}

	public async logout(token: string) {
		const keys = await this.redisService.keys('sessions:*')

		const currentSession = await Promise.all(
			keys.map(async key => {
				const session = await this.redisService.hgetall(key)

				return session.token === token ? session : null
			})
		).then(sessions => sessions.find(Boolean))

		if (!currentSession) throw new NotFoundException('Session not found')

		await this.redisService.del(`sessions:${currentSession.id}`)
		await this.redisService.del(`user_sessions:${currentSession.id}`)

		return true
	}
}
