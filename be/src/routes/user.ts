import { FastifyInstance } from "fastify";
import httpErrors from "http-errors";

import { prisma } from "../";

export default async function (app: FastifyInstance) {
  // @ts-ignore
  app.addHook("preHandler", app.auth([app.checkAuth]));

  app.get<{ Querystring: IMovementsQueryString }>(
    "movements",
    async (req, res) => {
      const movements = await prisma.group.findMany({
        where: {
          id: req.query.groupId,
        },
        include: {
          payments: true,
          purchases: true,
        },
      });

      res.send(movements);
    }
  );
  app.get<{ Querystring: IUsersGroupQueryString }>(
    "/users",
    async (req, res) => {
      return res.send(
        await prisma.user.findMany({
          where: {
            groups: {
              every: {
                id: req.query.groupId,
              },
            },
          },
        })
      );
    }
  );

  app.post<{
    Body: IPurchaseBody;
  }>(`/purchase`, async (req, res) => {
    const { description, payerId, products, groupId } = req.body;

    const amount = products.reduce((tot, prod) => {
      return tot + prod.pricePerDebtor;
    }, 0);

    const prodsToCreate = products.reduce<
      {
        name: string;
        pricePerDebtor: number;
        debtors: { connect: { id: string }[] };
      }[]
    >((acc, prod) => {
      acc.push({
        name: prod.name,
        pricePerDebtor: prod.pricePerDebtor,
        debtors: {
          connect: prod.debtors.map((debtor) => ({ id: debtor })),
        },
      });

      return acc;
    }, []);

    const result = await prisma.purchase.create({
      data: {
        groupId,
        payerId,
        amount,
        description,
        products: {
          create: prodsToCreate,
        },
      },
    });

    return res.send(result);
  });

  app.post<{
    Body: IPaymentBody;
  }>(`/payment`, async (req, res) => {
    const { amount, payerId, payeeId, groupId } = req.body;

    if (!payerId || !payeeId || !amount) {
      return res.send(
        new httpErrors.BadRequest("amount, payerId and payeeId are needed")
      );
    }

    const result = await prisma.payment.create({
      data: {
        amount,
        payerId,
        payeeId,
        groupId,
      },
    });

    return res.send(result);
  });

  app.get<{ Querystring: IBalanceQueryString }>(
    "/balance",
    async (req, res) => {
      const usersGroup = await prisma.group.findUnique({
        where: {
          id: req.query.groupId,
        },
        include: {
          users: {
            select: {
              id: true,
            },
          },
        },
      });

      const balance: TBalance = {};

      for (const payer of usersGroup?.users || []) {
        balance[payer.id] = {};

        for (const debtor of usersGroup?.users || []) {
          if (payer.id === debtor.id) continue;
          const aggregatePurchases = await prisma.product.aggregate({
            _sum: {
              pricePerDebtor: true,
            },
            where: {
              purchase: {
                groupId: req.query.groupId,
                payerId: payer.id,
              },
              debtors: {
                some: {
                  id: debtor.id,
                },
              },
            },
          });
          const aggregatePayments = await prisma.payment.aggregate({
            _sum: {
              amount: true,
            },
            where: {
              groupId: req.query.groupId,
              payerId: payer.id,
              payeeId: debtor.id,
            },
          });

          const reversedUsersDebts = balance[debtor.id]?.[payer.id];
          const debts =
            (aggregatePurchases?._sum?.pricePerDebtor || 0) +
            (aggregatePayments?._sum?.amount || 0);

          if (debts) {
            if (reversedUsersDebts) {
              if (debts <= reversedUsersDebts) {
                balance[debtor.id][payer.id] = reversedUsersDebts - debts;
                balance[payer.id][debtor.id] = 0; // set to 0
              } else {
                balance[debtor.id][payer.id] = 0; // set to 0
                balance[payer.id][debtor.id] = debts - reversedUsersDebts;
              }
            } else {
              balance[payer.id][debtor.id] = debts;
            }
          }
        }
      }

      return res.send(balance);
    }
  );
}

type TUserId = string;
type TBalance = Record<TUserId, Record<TUserId, number | null>>;

type TProduct = {
  name: string;
  pricePerDebtor: number;
  debtors: string[];
};

interface IPaymentBody {
  amount: number;
  payerId: string;
  payeeId: string;
  groupId: string;
}

interface IPurchaseBody {
  description: string;
  amount: number;
  payerId: string;
  products: TProduct[];
  groupId: string;
}

interface IBalanceQueryString {
  groupId: string;
}
interface IMovementsQueryString {
  groupId: string;
}

interface IUsersGroupQueryString {
  groupId: string;
}
