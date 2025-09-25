import { Body, Controller, HttpCode, HttpStatus, Patch } from '@nestjs/common'
import { User } from '@prisma/__generated__'

import { Authorization, Authorized } from '@/shared/decorators'

import { UpdateUserRequest } from './dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	public constructor(private readonly usersService: UsersService) {}

	@Authorization()
	@Patch('@me')
	@HttpCode(HttpStatus.OK)
	public async patchUser(
		@Authorized() user: User,
		@Body() dto: UpdateUserRequest
	) {
		return this.usersService.update(user, dto)
	}
}
