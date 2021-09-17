import { FastifyInstance } from "fastify";
import httpErrors from "http-errors";

import { prisma } from "../";
import { IBalanceQueryString, TBalance } from "../interfaces";

const generateInviteCode = (strLength: number = 6) => {
  const result = [];
  const charSet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  while (--strLength) {
    result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
  }

  return result.join("");
};

export default async function (app: FastifyInstance) {
  // @ts-ignore
  app.addHook("preHandler", app.auth([app.checkAuth]));

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
              movement: {
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

          const aggregatePayments = await prisma.movement.aggregate({
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
