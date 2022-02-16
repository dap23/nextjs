import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  let order;
  if (req.body.id) {
    order = await prisma.bank.update({
      where: {
        id: req.body.id,
      },
      data: req.body,
    });
  } else if (req.body.delete) {
    order = await prisma.bank.delete({
      where: {
        id: req.body.delete,
      },
    });
  } else {
    order = await prisma.bank.create({
      data: req.body,
    });
  }

  res.status(200).json(order);
}
