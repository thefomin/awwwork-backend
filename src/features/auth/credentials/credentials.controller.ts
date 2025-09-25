import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post
} from '@nestjs/common'

import { CredentialsService } from './credentials.service'
import { CreateUserRequest } from './dto'

@Controller('auth/credentials')
export class CredentialsController {
	public constructor(
		private readonly credentialsService: CredentialsService
	) {}

	@Post('create')
	@HttpCode(HttpStatus.OK)
	public async create(@Body() dto: CreateUserRequest) {
		return this.credentialsService.create(dto)
	}
}
