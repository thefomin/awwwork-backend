import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { hash } from 'argon2'

import { PrismaService } from '@/shared/api/prisma/prisma.service'
import { RedisService } from '@/shared/api/redis/redis.service'

import { CreateUserRequest, UpdateUserRequest } from './dto'

@Injectable()
export class CredentialsService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly redisService: RedisService
	) {}

	public async findById(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			},
			include: {
				externalAccounts: true
			}
		})

		if (!user) {
			throw new NotFoundException(
				'Пользователь не найден. Пожалуйста, проверьте введенные данные.'
			)
		}

		return user
	}

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
		const isExists = await this.prismaService.user.findFirst({
			where: {
				email: dto.email
			}
		})

		if (isExists) {
			throw new ConflictException('Такой пользователь уже существует')
		}
		const user = await this.prismaService.user.create({
			data: {
				username: dto.username,
				email: dto.email,
				password: await hash(dto.password)
			},
			include: {
				externalAccounts: true
			}
		})
		const session = await this.redisService.createSession(user)

		return session
	}
	public async update(userId: string, dto: UpdateUserRequest) {
		const user = await this.findById(userId)
		const updatedUser = await this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				email: dto.email,
				username: dto.username
			}
		})

		return updatedUser
	}
}
