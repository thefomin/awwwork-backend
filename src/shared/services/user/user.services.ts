import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/api';
import { CreateUserRequest } from './dto';
import { hash } from 'argon2';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByLogin(login: string) {
    return this.prisma.user.findFirst({
      where: { OR: [{ email: login }, { username: login }] },
      include: { externalAccounts: true }
    });
  }

  async createUserWithProfile(dto: CreateUserRequest) {
    const user = await this.prisma.user.create({
      data: {
        username: dto.username.replace(/[^a-zA-Z0-9_]/g, ''),
        email: dto.email,
        password: await hash(dto.password)
      }
    });

    await this.prisma.profile.create({
      data: { userId: user.id, username: user.username }
    });

    return user;
  }
}
