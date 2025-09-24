import { config } from 'dotenv'
import path from 'node:path'
import type { PrismaConfig } from 'prisma'

config({ path: path.resolve(process.cwd(), '.env') })
export default {
	schema: path.join('prisma')
} satisfies PrismaConfig
