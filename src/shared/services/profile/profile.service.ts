import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/shared/api';
import { User } from '@prisma/__generated__';
import { UpdateProfileRequest } from './dto';


@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createProfile(user: User){
    await this.prismaService.profile.create({
         data: { userId: user.id, username: user.username }
    })
  }

  public async updateProfile(user: User, dto: UpdateProfileRequest) {
     const updatedProfile = await this.prismaService.profile.update({
        where: { userId: user.id },
        data: { 
          firstName: dto.firstName, 
          lastName: dto.lastName, 
          bio: dto.bio, 
          location: dto.location, 
          website: dto.website, 
          socialLinks: dto.socialLinks 
        },
      })
  
      return updatedProfile
    }

   public async findProfile(user: User) {
      const profile = await this.prismaService.profile.findUnique({
        where: {
          userId: user.id
        }
      })
  
      return profile
    }

 
}
