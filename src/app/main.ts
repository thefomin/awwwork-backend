import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const config = app.get(ConfigService)
	await app.listen(config.getOrThrow<string>('APPLICATION_PORT'), '0.0.0.0')
}
bootstrap().catch(err => {
	console.error('Application failed to start', err)
	process.exit(1)
})
