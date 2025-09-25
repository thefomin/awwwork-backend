import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@prisma/__generated__'

import { PrismaService } from '@/shared/api/prisma/prisma.service'

import { UpdateUserRequest } from './dto'

@Injectable()
export class UsersService {
	public constructor(private readonly prismaService: PrismaService) {}

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

	public async update(user: User, dto: UpdateUserRequest) {
		await this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				displayName: dto.displayName
			},
			select: {
				id: true,
				displayName: true,
				email: true,
				avatar: true
			}
		})

		return true
	}
}
