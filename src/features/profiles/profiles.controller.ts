import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Patch
} from '@nestjs/common'
import { User } from '@prisma/__generated__'

import { Authorization, Authorized } from '@/shared/decorators'

import { ProfilesService } from './profiles.service'
import { UpdateProfileRequest } from '@/shared/services/profile/dto'

@Controller('profile')
export class ProfilesController {
    public constructor(private readonly profilesService: ProfilesService) {}

    @Authorization()
    @Patch('@me')
    @HttpCode(HttpStatus.OK)
    public async updateUser(
        @Authorized() user: User,
        @Body() dto: UpdateProfileRequest
    ) {
        return this.profilesService.updateProfile(user, dto)
    }

    @Authorization()
    @HttpCode(HttpStatus.OK)
    @Get('@me')
    public async findUser(@Authorized() user: User) {
        return this.profilesService.findProfile(user)
    }
}
