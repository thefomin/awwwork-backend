import { Body, Controller, Post } from '@nestjs/common'
import { User } from '@prisma/__generated__'

import { Authorization, Authorized } from '@/shared/decorators'

import { CareersService } from './careers.service'
import { CreateCareerRequest } from './dto'

@Controller('careers')
export class CareersController {
	public constructor(private readonly careersService: CareersService) {}

	@Authorization()
	@Post()
	public async createCareer(
		@Authorized() user: User,
		@Body() dto: CreateCareerRequest
	) {
		return this.careersService.create(user, dto)
	}
}
