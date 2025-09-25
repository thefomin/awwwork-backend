import {
	Body,
	Controller,
	Headers,
	HttpCode,
	HttpStatus,
	Post
} from '@nestjs/common'

import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	public constructor(private readonly usersService: UsersService) {}
}
