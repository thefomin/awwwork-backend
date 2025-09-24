import { ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength
} from 'class-validator'

export class UpdateUserDto {
	@ApiPropertyOptional({ description: 'Имя пользователя' })
	@IsOptional()
	@IsString({ message: 'Имя должно быть строкой' })
	@IsNotEmpty({ message: 'Имя обязательно для заполнения' })
	@MaxLength(50, { message: 'Имя не должно превышать 50 символов' })
	public name?: string

	@ApiPropertyOptional({ description: 'Email пользователя' })
	@IsOptional()
	@IsString({ message: 'Email должен быть строкой' })
	@IsEmail({}, { message: 'Некорректный формат email' })
	@IsNotEmpty({ message: 'Email обязателен для заполнения' })
	public email?: string

	@ApiPropertyOptional({
		description: 'Включена ли двухфакторная аутентификация'
	})
	@IsOptional()
	@IsBoolean({ message: 'isTwoFactorEnabled должно быть булевым значением' })
	public isTwoFactorEnabled?: boolean
}
