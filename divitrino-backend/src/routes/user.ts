import { FastifyInstance } from "fastify";
import httpErrors from "http-errors";

import { prisma } from "../";
import {
  IBalanceQueryString,
  IMovementsQueryString,
  IPaymentBody,
  IPurchaseBody,
} from "../interfaces";

export default async function (app: FastifyInstance) {
  // @ts-ignore
  app.addHook("preHandler", app.auth([app.checkAuth]));

  app.get<{ Querystring: IMovementsQueryString }>(
    "/movements",
    async (req, res) => {
      const movements = await prisma.group.findFirst({
        where: {
          id: req.query.groupId,
        },
        include: {
          payments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              payer: true,
              payee: true,
            },
          },
          purchases: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              payer: true,
            },
          },
        },
      });

      res.send(movements);
    }
  );

  app.get("/groups", async (req, res) => {
    return res.send(
      await prisma.group.findMany({
        where: {
          users: {
            some: {
              // @ts-ignore
              id: req.user.id,
            },
          },
        },
        include: {
          users: true,
        },
      })
    );
  });

  app.post<{ Body: { groupName: string } }>("/group", async (req, res) => {
    if (!req.body.groupName) {
      return res.send(new httpErrors.BadRequest("A group name is needed"));
    }

    const group = await prisma.group.create({
      data: {
        name: req.body.groupName,
        users: {
          connect: {
            // @ts-ignore
            id: req.user.id,
          },
        },
      },
    });

    return res.send(group);
  });

  app.post<{ Body: { invitedUserEmail: string; groupId: string } }>(
    "/invite",
    async (req, res) => {
      const { groupId, invitedUserEmail } = req.body;
      if (!invitedUserEmail || !groupId) {
        return res.send(
          new httpErrors.BadRequest("An email and a groupId is needed")
        );
      }

      const invitedUser = await prisma.user.findUnique({
        where: {
          email: invitedUserEmail,
        },
      });

      if (invitedUser) {
        // todo will be removed when in-app invites will be added
        const group = await prisma.group.update({
          where: {
            id: groupId,
          },
          data: {
            users: {
              connect: {
                // @ts-ignore
                id: req.user.id,
              },
            },
          },
        });
        return res.send(group);
      } else {
        const invite = await prisma.invite.create({
          data: {
            invitedUserEmail,
            groupId,
            // @ts-ignore
            invitedByUserId: req.user.id,
          },
        });
        return res.send(invite);
      }
    }
  );

  app.post<{
    Body: IPurchaseBody;
  }>(`/purchase`, async (req, res) => {
    const { description, payerId, products, groupId, date } = req.body;

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
        date,
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

      for (const creditor of usersGroup?.users || []) {
        balance[creditor.id] = {};

        for (const debtor of usersGroup?.users || []) {
          if (creditor.id === debtor.id) continue;
          const aggregatePurchases = await prisma.product.aggregate({
            _sum: {
              pricePerDebtor: true,
            },
            where: {
              purchase: {
                groupId: req.query.groupId,
                payerId: creditor.id,
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
              payerId: creditor.id,
              payeeId: debtor.id,
            },
          });

          const reversedUsersDebts = balance[debtor.id]?.[creditor.id];
          const debts =
            (aggregatePurchases?._sum?.pricePerDebtor || 0) +
            (aggregatePayments?._sum?.amount || 0);

          if (debts) {
            if (reversedUsersDebts) {
              if (debts <= reversedUsersDebts) {
                balance[debtor.id][creditor.id] = reversedUsersDebts - debts;
                balance[creditor.id][debtor.id] = 0; // set to 0
              } else {
                balance[debtor.id][creditor.id] = 0; // set to 0
                balance[creditor.id][debtor.id] = debts - reversedUsersDebts;
              }
            } else {
              balance[creditor.id][debtor.id] = debts;
            }
          }
        }
      }

      return res.send(balance);
    }
  );
}
