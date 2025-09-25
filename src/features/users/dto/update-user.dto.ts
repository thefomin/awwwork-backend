import { ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength
} from 'class-validator'

export class UpdateUserRequest {
	@ApiPropertyOptional({ description: 'Имя пользователя' })
	@IsOptional()
	@IsString({ message: 'Имя должно быть строкой' })
	@IsNotEmpty({ message: 'Имя обязательно для заполнения' })
	@MaxLength(50, { message: 'Имя не должно превышать 50 символов' })
	public displayName?: string
}
