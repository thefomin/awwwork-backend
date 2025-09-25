import { DocumentBuilder } from '@nestjs/swagger'

export function getSwaggerConfig() {
	return new DocumentBuilder()
		.setTitle('Awwwork API')
		.setDescription('docs API')
		.setVersion('1.0.0')
		.setContact('Awwwork', 'https://awwwork.ru', 'info@awwwork.ru')
		.build()
}
