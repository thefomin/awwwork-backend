export interface Session {
	id: string
	token: string
	userId: string
}

export interface UserSession {
	id: string
	createdAt: Date | string
	sessionId: string
}
