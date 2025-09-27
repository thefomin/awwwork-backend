import { UpdateProfileRequest } from "@/shared/services/profile/dto";
import { ProfileService } from "@/shared/services/profile/profile.service";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/__generated__";

@Injectable()
export class ProfilesService{

    constructor(private readonly profileService: ProfileService){}

    public async updateProfile(user: User, dto: UpdateProfileRequest){
       const updated = await this.profileService.updateProfile(user, dto)

       if (!updated) {
      throw new NotFoundException('Профиль не найден для обновления')
    }

    return updated
    }

    public async findProfile(user: User){
      const profile = await this.profileService.findProfile(user);

      if (!profile) {
        throw new NotFoundException('Профиль не найден');
      }

      return profile;
    }
}