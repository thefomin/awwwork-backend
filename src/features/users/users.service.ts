import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'

import { PrismaService } from '@/shared/api/prisma/prisma.service'

@Injectable()
export class UsersService {
	public constructor(private readonly prismaService: PrismaService) {}
}
