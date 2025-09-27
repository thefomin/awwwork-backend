import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { verify } from 'argon2'


import { SigninRequest } from './dto'
import { UserService } from '@/shared/services/user/user.service'
import { SessionService } from '@/shared/services/session/session.service'
import { ProfileService } from '@/shared/services/profile/profile.service'
import { CreateUserRequest } from '@/shared/services/user/dto'

@Injectable()
export class CredentialsService {
	public constructor(
		private readonly userService: UserService,
		private readonly sessionService: SessionService,
		private readonly profileService: ProfileService
	) {}

	public async create(dto: CreateUserRequest) {
		const exists = await this.userService.findByLogin(dto.email);
		if (exists) throw new ConflictException('Пользователь уже существует');

		const user = await this.userService.createUser(dto);

		await this.profileService.createProfile(user)
		return this.sessionService.createForUser(user);
 	}

  	public async login(dto: SigninRequest) {
		const user = await this.userService.findByLogin(dto.username);
		const isValid = await verify(user.password, dto.password);
		if (!isValid) throw new UnauthorizedException('Неверные данные');

		return { session: await this.sessionService.createForUser(user), user };
 	}

	public async logout(token: string) {
		return this.sessionService.destroyByToken(token);
	}
}
