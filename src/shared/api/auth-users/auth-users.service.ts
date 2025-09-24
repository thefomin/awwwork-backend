import { Injectable, NotFoundException } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthMethod } from 'prisma/__generated__'

import { PrismaService } from '../prisma/prisma.service'

import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class AuthUserService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findById(id: string) {
		const user = await this.prismaService.authUser.findUnique({
			where: {
				id
			},
			include: {
				providers: true
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
		const user = await this.prismaService.authUser.findFirst({
			where: {
				OR: [{ email: login }, { username: login }]
			},
			include: {
				providers: true
			}
		})

		return user
	}

	public async create(
		email: string,
		password: string,
		username: string,
		method: AuthMethod,
		isVerified: boolean
	) {
		const user = await this.prismaService.authUser.create({
			data: {
				email,
				password: password ? await hash(password) : '',
				username,
				method,
				isVerified
			},
			include: {
				providers: true
			}
		})
		return user
	}
	public async update(userId: string, dto: UpdateUserDto) {
		const user = await this.findById(userId)
		const updatedUser = await this.prismaService.authUser.update({
			where: {
				id: user.id
			},
			data: {
				email: dto.email,
				username: dto.name,
				isTwoFactorEnabled: dto.isTwoFactorEnabled
			}
		})

		return updatedUser
	}
}
