import {
	Injectable,
	Logger,
	type OnModuleDestroy,
	type OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { User } from '@prisma/__generated__'
import { randomBytes } from 'crypto'
import Redis from 'ioredis'
import { v4 as uuidv4 } from 'uuid'

import { Session, UserSession } from '@/shared/interfaces'

@Injectable()
export class RedisService
	extends Redis
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(RedisService.name)

	public constructor(private readonly configService: ConfigService) {
		super(configService.getOrThrow<string>('REDIS_URI'))
	}

	public onModuleInit() {
		this.logger.log('🔄 Initializing Redis connection...')
		this.on('connect', () => {
			this.logger.log('✅ Redis connected successfully')
		})
		this.on('error', err => {
			this.logger.error('❌ Failed to connect to Redis:', err)
		})
	}

	public async onModuleDestroy() {
		this.logger.log('🔻 Shutting down Redis connection...')

		try {
			await this.quit()
			this.logger.log('🟢 Redis connection closed successfully.')
		} catch (error) {
			this.logger.error(
				'⚠️ Error while shutting down Redis connection',
				error
			)
			throw error
		}
	}

	public async createSession(user: User) {
		const session: Session = {
			id: uuidv4(),
			token: randomBytes(40).toString('hex'),
			userId: user.id
		}

		await this.del(`sessions:${session.id}`)

		await this.hmset(`sessions:${session.id}`, {
			id: session.id.toString(),
			token: session.token,
			userId: session.userId.toString()
		})
		await this.expire(`sessions:${session.id}`, 7 * 24 * 60 * 60)

		const userSession: UserSession = {
			id: uuidv4(),
			createdAt: new Date().toISOString(),
			sessionId: session.id
		}

		await this.set(
			`user_sessions:${session.id}`,
			JSON.stringify(userSession),
			'EX',
			7 * 24 * 60 * 60
		)

		return session
	}

	public async getUserSession(
		sessionId: string
	): Promise<UserSession | null> {
		try {
			const raw = await this.get(`user_sessions:${sessionId}`)
			if (!raw) {
				this.logger.warn(
					`UserSession not found for sessionId: ${sessionId}`
				)
				return null
			}

			let data: UserSession
			try {
				data = JSON.parse(raw) as UserSession
			} catch (err: unknown) {
				this.logger.error(
					`Failed to parse UserSession for sessionId: ${sessionId}`,
					err instanceof Error ? err : undefined
				)
				return null
			}

			if (!data || !data.id || !data.sessionId) {
				this.logger.warn(
					`Invalid UserSession data for sessionId: ${sessionId}`
				)
				return null
			}

			return data
		} catch (error: unknown) {
			this.logger.error(
				`Failed to get UserSession for sessionId: ${sessionId}`,
				error instanceof Error ? error : undefined
			)
			throw error
		}
	}
}
