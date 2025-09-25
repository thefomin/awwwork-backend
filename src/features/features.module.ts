import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { CredentialsModule } from './auth/credentials/credentials.module'

@Module({
	imports: [ScheduleModule.forRoot(), CredentialsModule],
	providers: []
})
export class FeaturesModule {}
