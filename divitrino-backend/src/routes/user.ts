import { FastifyInstance } from "fastify";
import httpErrors from "http-errors";

import { prisma } from "../";
import {
  IBalanceQueryString,
  IMovementsQueryString,
  IPaymentBody,
  IProductsPurchaseQueryString,
  IPurchaseBody,
  TBalance,
} from "../interfaces";

function generateInviteCode(strLength: number = 6) {
  const result = [];
  const charSet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  while (--strLength) {
    result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
  }

  return result.join("");
}

const checkIfUserBelongsToGroup = async (userId: string, groupId: string) => {
  const userGroup = await prisma.user.findFirst({
    where: {
      id: userId,
      groups: {
        some: {
          id: groupId,
        },
      },
    },
  });

  return userGroup;
};

export default async function (app: FastifyInstance) {
  // @ts-ignore
  app.addHook("preHandler", app.auth([app.checkAuth]));

  app.get<{ Querystring: IMovementsQueryString }>(
    "/movements",
    async (req, res) => {
      if (!req.query.groupId) {
        return res.send(new httpErrors.BadRequest("A group id is needed"));
      }

      const purchases = await prisma.purchase.findMany({
        where: {
          group: {
            id: req.query.groupId,
            users: {
              some: {
                //@ts-ignore
                id: req.user.id,
              },
            },
          },
        },
        skip: req.query.page ? +req.query.page * (req.query.size || 10) : 0,
        take: req.query.size ? +req.query.size : 10,
        orderBy: {
          date: "desc",
        },
        include: {
          payer: true,
          addedBy: true,
        },
      });

      const payments = await prisma.payment.findMany({
        where: {
          group: {
            id: req.query.groupId,
            users: {
              some: {
                //@ts-ignore
                id: req.user.id,
              },
            },
          },
        },
        skip: req.query.page ? +req.query.page * (req.query.size || 10) : 0,
        take: req.query.size ? +req.query.size : 10,
        orderBy: {
          date: "desc",
        },
        include: {
          payer: true,
          payee: true,
          addedBy: true,
        },
      });

      const movements: any[] = [...purchases, ...payments];

      movements.sort((a, b) => {
        return +new Date(b.date) - +new Date(a.date);
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

  app.post<{ Body: { code: string; inviteId: number } }>(
    "/join",
    async (req, res) => {
      const { code, inviteId } = req.body;
      if (!code || !inviteId) {
        return res.send(
          new httpErrors.BadRequest("A code and an inviteId is needed")
        );
      }

      const invite = await prisma.invite.findFirst({
        where: {
          code,
          id: inviteId,
          used: false,
        },
      });

      if (invite) {
        const group = await prisma.group.update({
          where: {
            id: invite.groupId,
          },
          data: {
            invites: {
              update: {
                where: {
                  id: invite.id,
                },
                data: {
                  used: true,
                },
              },
            },
            users: {
              connect: {
                // @ts-ignore
                id: req.user.id,
              },
            },
          },
        });
        return res.send(group);
      }

      return res.send(new httpErrors.BadRequest("No invite has been found"));
    }
  );

  app.post<{ Body: { groupId: string } }>("/invite", async (req, res) => {
    const { groupId } = req.body;
    if (!groupId) {
      return res.send(
        new httpErrors.BadRequest("An email and a groupId is needed")
      );
    }

    const invite = await prisma.invite.create({
      data: {
        code: generateInviteCode(),
        groupId,
        // @ts-ignore
        invitedByUserId: req.user.id,
      },
    });

    return res.send(invite);
  });

  app.post<{
    Body: IPurchaseBody;
  }>(`/purchase`, async (req, res) => {
    const { description, payerId, products, groupId, date } = req.body;

    if (!date || !payerId || !description || !products?.length || !groupId) {
      return res.send(new httpErrors.BadRequest("Stuff is needed bro"));
    }

    //@ts-ignore
    const userGroup = await checkIfUserBelongsToGroup(req.user.id, groupId);

    if (!userGroup) {
      return res.send(
        new httpErrors.BadRequest("This is not a group of yours")
      );
    }

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
        // @ts-ignore
        addedByUserId: req.user.id,
        groupId,
        payerId,
        description,
        date,
        products: {
          create: prodsToCreate,
        },
      },
    });

    return res.send(result);
  });

  app.delete<{ Querystring: { purchaseId: string } }>(
    "/purchase",
    async (req, res) => {
      if (!req.query.purchaseId) {
        return res.send(new httpErrors.BadRequest("A purchaseId is needed"));
      }

      const prodsDeletion = await prisma.product.deleteMany({
        where: {
          purchaseId: req.query.purchaseId,
          purchase: {
            group: {
              users: {
                some: {
                  //@ts-ignore
                  id: req.user.id,
                },
              },
            },
          },
        },
      });

      const purchaseDeletion = await prisma.purchase.delete({
        where: {
          id: req.query.purchaseId,
        },
      });

      return res.send({ prodsDeletion, purchaseDeletion });
    }
  );

  app.get<{ Querystring: IProductsPurchaseQueryString }>(
    "/purchase",
    async (req, res) => {
      const purchase = await prisma.purchase.findFirst({
        where: {
          id: req.query.purchaseId,
          group: {
            users: {
              some: {
                //@ts-ignore
                id: req.user.id,
              },
            },
          },
        },
        include: {
          products: {
            include: {
              debtors: true,
            },
          },
        },
      });

      res.send(purchase);
    }
  );

  app.delete<{ Querystring: { paymentId: string } }>(
    "/payment",
    async (req, res) => {
      if (!req.query.paymentId) {
        return res.send(new httpErrors.BadRequest("A paymentId is needed"));
      }

      const deletion = await prisma.payment.delete({
        where: {
          id: req.query.paymentId,
        },
      });

      return res.send(deletion);
    }
  );

  app.post<{
    Body: IPaymentBody;
  }>(`/payment`, async (req, res) => {
    const { amount, payerId, payeeId, groupId, date } = req.body;

    if (!payerId || !payeeId || !amount || !date || !groupId) {
      return res.send(
        new httpErrors.BadRequest(
          "amount, payerId, payeeId and date are needed"
        )
      );
    }

    //@ts-ignore
    const userGroup = await checkIfUserBelongsToGroup(req.user.id, groupId);

    if (!userGroup) {
      return res.send(
        new httpErrors.BadRequest("This is not a group of yours")
      );
    }

    const result = await prisma.payment.create({
      data: {
        // @ts-ignore
        addedByUserId: req.user.id,
        amount,
        payerId,
        payeeId,
        groupId,
        date,
      },
    });

    return res.send(result);
  });

  app.get<{ Querystring: IBalanceQueryString }>(
    "/balance",
    async (req, res) => {
      const usersGroup = await prisma.group.findFirst({
        where: {
          id: req.query.groupId,
          users: {
            some: {
              //@ts-ignore
              id: req.user.id,
            },
          },
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
