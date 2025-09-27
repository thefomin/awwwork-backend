import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { User } from '@prisma/__generated__'


import { UserService } from '@/shared/services/user/user.service'
import { UpdateUserRequest } from '@/shared/services/user/dto'

@Injectable()
export class UsersService {
	public constructor(private readonly userService:UserService ) {}

	public async update(user: User, dto: UpdateUserRequest){
		const updated = await this.userService.updateUser(user, dto)

		 if (!updated) {
		throw new NotFoundException('Профиль не найден для обновления')
		}
		return updated
	}
	

}
