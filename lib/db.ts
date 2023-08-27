import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

// Avoid to initialize a new prisma client in every change on the application
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db
