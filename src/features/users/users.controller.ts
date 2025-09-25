import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Patch
} from '@nestjs/common'
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
	public async updateUser(
		@Authorized() user: User,
		@Body() dto: UpdateUserRequest
	) {
		return this.usersService.update(user, dto)
	}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Get('@me')
	public async findUser(@Authorized() user: User) {
		return this.usersService.findUser(user)
	}
}
