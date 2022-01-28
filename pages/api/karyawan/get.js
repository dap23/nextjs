import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    await prisma.$connect();

    const take = req.query.size ?? 10;
    const page = req.query.page ?? 1;
    const search = req.query.search ?? "";
    const id = req.query.id ?? "";
    const skip = (page - 1) * take;
    const count = await prisma.karyawan.count();
    let allOrders;
    if (id == "") {
        allOrders = await prisma.karyawan.findMany({
            orderBy: [
                {
                    createdAt: 'desc',
                },
            ],
            where: {
                OR: [
                    {
                        nama: {
                            contains: search,
                        },
                    },

                ],
            },
            skip: skip,
            take: parseInt(take)
        })
    } else {
        allOrders = await prisma.karyawan.findFirst({
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