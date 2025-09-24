import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const config = app.get(ConfigService)
	const swaggerConfig = new DocumentBuilder()
		.setTitle('Awwwork API')
		.setDescription('API Documentation')
		.setVersion('1.0.0')
		.setContact('Awwwork', 'https://awwwork.ru', 'info@awwwork.ru')
		.build()

	const document = SwaggerModule.createDocument(app, swaggerConfig)

	SwaggerModule.setup('/docs', app, document, {
		yamlDocumentUrl: '/swagger.yaml'
	})
	await app.listen(config.getOrThrow<string>('APPLICATION_PORT'), '0.0.0.0')
}
bootstrap().catch(err => {
	console.error('Application failed to start', err)
	process.exit(1)
})
