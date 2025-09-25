import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import type { User } from '@prisma/__generated__'

export const Authorized = createParamDecorator(
	(data: keyof User, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<{ user?: User }>()
		const user = request.user

		if (!user) {
			return null
		}

		return data ? user[data] : user
	}
)
