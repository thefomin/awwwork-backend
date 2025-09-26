import { Injectable } from '@nestjs/common'
import { User } from '@prisma/__generated__'

import { PrismaService } from '@/shared/api/prisma/prisma.service'
import { RedisService } from '@/shared/api/redis/redis.service'

import { CreateCareerRequest } from './dto'

@Injectable()
export class CareersService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async create(user: User, dto: CreateCareerRequest) {
		await this.prismaService.userCareer.create({
			data: {
				userId: user.id,
				headline: dto.headline,
				experience: dto.experience,
				company: dto.company,
				employmentType: dto.employmentType,
				skills: dto.skills,
				isLookingForJob: dto.isLookingForJob
			}
		})
	}
}
