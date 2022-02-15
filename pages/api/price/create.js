import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


export default async function handler(req, res) {
    let order;
    if (req.body.id) {
        order = await prisma.price.update({
            where: {
                id: req.body.id,
            },
            data: { ...req.body, Harga: parseInt(req.body.Harga) },
        })
    } else if (req.body.delete) {
        order = await prisma.price.delete({
            where: {
                id: req.body.delete,
            }
        })
    } else {
        order = await prisma.price.create({
            data: { ...req.body, Harga: parseInt(req.body.Harga) },
        })
    }

    res.status(200).json(order)

}