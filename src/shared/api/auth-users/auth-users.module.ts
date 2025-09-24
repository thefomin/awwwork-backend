import { Module } from '@nestjs/common'

import { AuthUserService } from './auth-users.service'

@Module({
	providers: [AuthUserService],
	exports: [AuthUserService]
})
export class UserModule {}
