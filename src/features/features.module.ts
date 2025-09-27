import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { CredentialsModule } from './auth/credentials/credentials.module'
import { CareersModule } from './careers/careers.module'
import { UsersModule } from './users/users.module'
import { ProfilesModule } from './profiles/profiles.module'

@Module({
	imports: [
		ScheduleModule.forRoot(),
		CredentialsModule,
		UsersModule,
		ProfilesModule,
		CareersModule
	],
	providers: []
})
export class FeaturesModule {}
