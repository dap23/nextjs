import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    await prisma.$connect();

    let edited = await prisma.notaEdited.findFirst({
        where: {
            original_nota_id: req.query.id
        },
        orderBy: [
            {
                createdAt: 'desc',
            }
        ],
    });

    res.status(200).json(edited);

}