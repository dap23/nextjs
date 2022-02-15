import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    await prisma.$connect();

    const start = req.query.start;
    const end = req.query.end;

    var d = new Date(req.query.start);
    d.setDate(d.getDate() - 1);

    let allOrders = await prisma.nota.findMany({
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
        where: {
            createdAt: {
                gt: new Date(d),
                lt: new Date(end)
            },
        },
    })

    res.status(200).json({
        data: allOrders
    })

}