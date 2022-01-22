import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    await prisma.$connect();
    const count = await prisma.nota.count();
    res.status(200).json({
        count: count
    })

}