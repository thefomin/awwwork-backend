import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/shared/api/prisma/prisma.service'
import { RedisService } from '@/shared/api/redis/redis.service'

@Injectable()
export class CareersService {
	public constructor(private readonly prismaService: PrismaService) {}
}
