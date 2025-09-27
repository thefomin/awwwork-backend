import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ApiModule } from '@/shared/api/api.module'
import { IS_DEV_ENV } from '@/shared/utils'

import { FeaturesModule } from '@/features'
import { ServicesModule } from '@/shared/services'

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true
		}),
		FeaturesModule,
		ApiModule,
		ServicesModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
