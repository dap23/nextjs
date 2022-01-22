import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


export default async function handler(req, res) {
    let order;
    if (req.body.id) {
        order = await prisma.paymentType.update({
            where: {
                id: req.body.id,
            },
            data: req.body,
        })
    } else if (req.body.delete) {
        order = await prisma.paymentType.delete({
            where: {
                id: req.body.delete,
            }
        })
    } else {
        order = await prisma.paymentType.create({
            data: req.body,
        })
    }

    res.status(200).json(order)

}