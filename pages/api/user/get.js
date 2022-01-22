import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    await prisma.$connect();

    const take = 10;
    const page = req.query.page ?? 1;
    const skip = (page - 1) * take;
    const count = await prisma.user.count();
    const allOrders = await prisma.user.findMany({
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
        skip: skip,
        take: take
    })
    res.status(200).json({
        data: allOrders, pagination: {
            total_records: count,
            total_page: Math.ceil(count / take),
            current_page: page,
            per_page: take
        }
    })

}