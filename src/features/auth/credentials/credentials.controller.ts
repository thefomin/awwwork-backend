import {
	Body,
	Controller,
	Headers,
	HttpCode,
	HttpStatus,
	Post
} from '@nestjs/common'

import { CredentialsService } from './credentials.service'
import { CreateUserRequest, SigninRequest } from './dto'

@Controller('auth/credentials')
export class CredentialsController {
	public constructor(
		private readonly credentialsService: CredentialsService
	) {}

	@Post('sign-up')
	@HttpCode(HttpStatus.OK)
	public async create(@Body() dto: CreateUserRequest) {
		return this.credentialsService.create(dto)
	}

	@Post('sign-in')
	@HttpCode(HttpStatus.OK)
	public async login(@Body() dto: SigninRequest) {
		return this.credentialsService.login(dto)
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	public async logout(@Headers('x-session-token') token: string) {
		return this.credentialsService.logout(token)
	}
}
