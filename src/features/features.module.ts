import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { CredentialsModule } from './auth/credentials/credentials.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [ScheduleModule.forRoot(), CredentialsModule, UsersModule],
	providers: []
})
export class FeaturesModule {}
