import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    await prisma.$connect();

    const take = 10;
    const page = req.query.page ?? 1;
    const search = req.query.search ?? "";
    const id = req.query.id ?? "";
    const skip = (page - 1) * take;
    const count = await prisma.nota.count();
    let allOrders;
    if (id == "") {
        allOrders = await prisma.nota.findMany({
            orderBy: [
                {
                    createdAt: 'desc',
                },
            ],
            where: {
                OR: [
                    {
                        customer: {
                            contains: search,
                        },
                    },
                    {
                        nomor_nota: {
                            contains: search,
                        },
                    }
                ],
            },
            skip: skip,
            take: take
        })
    } else {
        allOrders = await prisma.nota.findFirst({
            where: {
                id: id
            }
        })
    }

    res.status(200).json({
        data: allOrders, pagination: {
            total_records: count,
            total_page: Math.ceil(count / take),
            current_page: page,
            per_page: take
        }
    })

}