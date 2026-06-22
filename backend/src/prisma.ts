//client turns the ts into queries
import { PrismaClient } from './generated/prisma/client'

//and the pg just talks to postgre
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

export default prisma