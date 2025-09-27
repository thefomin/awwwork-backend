import { IsOptional, IsString, IsUrl, IsObject } from 'class-validator'

export class UpdateProfileRequest {
  @IsOptional()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsString()
  lastName?: string

  @IsOptional()
  @IsString()
  picture?: string

  @IsOptional()
  @IsString()
  bio?: string

  @IsOptional()
  @IsString()
  location?: string

  @IsOptional()
  @IsUrl()
  website?: string

  @IsOptional()
  @IsObject()
  socialLinks?: Record<string, any>;
}
