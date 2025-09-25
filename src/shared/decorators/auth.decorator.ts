import { UseGuards, applyDecorators } from '@nestjs/common'
import { ApiHeader } from '@nestjs/swagger'

import { SessionAuthGuard } from '../guards/session.guard'

export function Authorization() {
	const decorators = [
		ApiHeader({
			name: 'X-Session-Token',
			required: true,
			description: 'Token of the currently authorized user'
		}),
		UseGuards(SessionAuthGuard)
	]

	return applyDecorators(...decorators)
}
