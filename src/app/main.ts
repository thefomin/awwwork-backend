import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'

import { setupSwagger } from '@/shared/utils/swagger.utils'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	const config = app.get(ConfigService)
	const logger = new Logger(AppModule.name)
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	)
	// app.set('trust proxy', true)

	setupSwagger(app)

	const port = config.getOrThrow<number>('HTTP_PORT')
	const host = config.getOrThrow<string>('HTTP_HOST')

	try {
		await app.listen(port)

		logger.log(`🚀 Server is running at: ${host}`)
		logger.log(`📄 Documentation is available at: ${host}/docs`)
	} catch (err: unknown) {
		if (err instanceof Error) {
			logger.error(`❌ Failed to start server: ${err.message}`, err)
		} else {
			logger.error('❌ Failed to start server: Unknown error', err as any)
		}
		process.exit(1)
	}
}
bootstrap().catch(err => {
	console.error('Fatal error during bootstrap:', err)
	process.exit(1)
})
