import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


export default async function handler(req, res) {
    const order = await prisma.user.create({
        data: req.body,
    })
    res.status(200).json(order)

}