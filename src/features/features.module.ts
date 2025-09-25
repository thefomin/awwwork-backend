import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { CredentialsModule } from './auth/credentials/credentials.module'
import { CareersModule } from './careers/careers.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ScheduleModule.forRoot(),
		CredentialsModule,
		UsersModule,
		CareersModule
	],
	providers: []
})
export class FeaturesModule {}
