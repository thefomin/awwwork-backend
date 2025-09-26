import { EmploymentType } from '@prisma/__generated__'
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsInt,
	IsOptional,
	IsString
} from 'class-validator'

export class CreateCareerRequest {
	@IsOptional()
	@IsString()
	headline?: string

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	skills?: string[]

	@IsOptional()
	@IsInt()
	experience?: number

	@IsOptional()
	@IsString()
	jobTitle?: string

	@IsOptional()
	@IsString()
	company?: string

	@IsOptional()
	@IsEnum(EmploymentType)
	employmentType?: EmploymentType

	@IsOptional()
	@IsBoolean()
	isLookingForJob?: boolean
}
