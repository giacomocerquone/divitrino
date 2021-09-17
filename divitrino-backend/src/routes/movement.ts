import { FastifyInstance } from "fastify";
import httpErrors from "http-errors";
import {
  IMovementsQueryString,
  IPayment,
  IProductsQueryString,
  IPurchase,
  IPurchasePrisma,
} from "../interfaces";
import { prisma } from "../";
import { buildMovementData } from "../utils";

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

  app.post<{ Body: IPayment & IPurchase }>("/movement", async (req, res) => {
    const { description, payerId, products, groupId, date, payeeId, amount } =
      req.body;

    if (
      (!date || !payerId || !groupId) &&
      (!(products?.length && description) || !(payeeId && amount))
    ) {
      return res.send(new httpErrors.BadRequest("Stuff is needed bro"));
    }

    //@ts-ignore
    const userGroup = await checkIfUserBelongsToGroup(req.user.id, groupId);
    if (!userGroup) {
      return res.send(new httpErrors.BadRequest("Not your group"));
    }

    //@ts-ignore
    const data = buildMovementData(req.body, req.user.id);
    const result = await prisma.movement.create({
      data,
    });

    return res.send(result);
  });

  app.delete<{ Querystring: { movementId: string } }>(
    "/movement",
    async (req, res) => {
      const { movementId } = req.query;
      if (!movementId) {
        return res.send(new httpErrors.BadRequest("A movementId is needed"));
      }

      const prodsDeletion = await prisma.product.deleteMany({
        where: {
          movementId,
          movement: {
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

      const movementDeletion = await prisma.movement.deleteMany({
        where: {
          id: req.query.movementId,
          group: {
            users: {
              some: {
                //@ts-ignore
                id: req.user.id,
              },
            },
          },
        },
      });

      return res.send({ prodsDeletion, movementDeletion });
    }
  );

  app.get<{ Querystring: IProductsQueryString }>(
    "/products",
    async (req, res) => {
      const { movementId } = req.query;

      if (!movementId) {
        return res.send(new httpErrors.BadRequest("A movementId is needed"));
      }

      const products = prisma.product.findMany({
        where: {
          movementId,
        },
      });

      return res.send(products);
    }
  );

  app.get<{ Querystring: IMovementsQueryString }>(
    "/movements",
    async (req, res) => {
      if (!req.query.groupId) {
        return res.send(new httpErrors.BadRequest("A group id is needed"));
      }

      const movs = await prisma.movement.findMany({
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

      movs.sort((a, b) => {
        return +new Date(b.date) - +new Date(a.date);
      });

      res.send(movs);
    }
  );
}
