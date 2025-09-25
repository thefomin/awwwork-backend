import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class SigninRequest {
	@IsString({ message: 'Логин должен быть строкой.' })
	@IsNotEmpty({ message: 'Логин обязателен для заполнения.' })
	username: string // сюда можно ввести email или username

	@IsString({ message: 'Пароль должен быть строкой.' })
	@IsNotEmpty({ message: 'Пароль обязателен для заполнения.' })
	@MinLength(6, {
		message: 'Пароль должен содержать минимум 6 символов.'
	})
	password: string

	@IsOptional()
	@IsString()
	code?: string
}
