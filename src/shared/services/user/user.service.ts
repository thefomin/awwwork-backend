import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/shared/api';
import { CreateUserRequest, UpdateUserRequest } from './dto';
import { hash } from 'argon2';
import { User } from '@prisma/__generated__';


@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByLogin(login: string) {
    return this.prismaService.user.findFirst({
      where: { OR: [{ email: login }, { username: login }] },
      include: { externalAccounts: true }
    });
  }

  async createUser(dto: CreateUserRequest) {
    const user = await this.prismaService.user.create({
      data: {
        username: dto.username.replace(/[^a-zA-Z0-9_]/g, ''),
        email: dto.email,
        password: await hash(dto.password)
      }
    });

    return user;
  }

  public async findById(id: string) {
      const user = await this.prismaService.user.findUnique({
        where: {
          id
        },
        include: {
          externalAccounts: true
        }
      })
  
      if (!user) {
        throw new NotFoundException(
          'Пользователь не найден. Пожалуйста, проверьте введенные данные.'
        )
      }
  
      return user
    }

   async updateUser(user: User, dto: UpdateUserRequest) {
    const updatedUser =  await this.prismaService.user.update({
      where: { id: user.id },
      data: { displayName: dto.displayName },
      select: { id: true, displayName: true, email: true, avatar: true },
    })

    return updatedUser
  }

  

}
