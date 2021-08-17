import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

import dotenv from "dotenv";
import httpErrors from "http-errors";
import fastifyAuth from "fastify-auth";
import cors from "fastify-cors";
import * as jwt from "./jwt";

import authRouter from "./routes/auth";
import userRouter from "./routes/user";

dotenv.config();
export const prisma = new PrismaClient();
const app = fastify();

app
  .decorate("checkAuth", async (req: any) => {
    if (!req.headers.authorization) {
      throw new httpErrors.Unauthorized("Access token is required");
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return new httpErrors.Unauthorized();
    }
    try {
      const user = await jwt.verify(token);
      if (user) {
        req.user = user;
        return;
      } else {
        throw new Error();
      }
    } catch (e) {
      throw new httpErrors.Unauthorized(e.message);
    }
  })
  // .decorate("checkAdmin", async (req: any) => {
  //   const { email } = req.user;

  //   try {
  //     const user = await prisma.user.findFirst({
  //       where: {
  //         email,
  //         group: {
  //           every: {
  //             admin: true,
  //           },
  //         },
  //       },
  //       include: {
  //         group: true,
  //       },
  //     });

  //     if (user) {
  //       return;
  //     } else {
  //       throw new httpErrors.Unauthorized();
  //     }
  //   } catch (e) {
  //     throw new httpErrors.InternalServerError(e);
  //   }
  // })
  .register(fastifyAuth)
  .register(cors, {
    origin: false,
  })
  .register(authRouter)
  .register(userRouter);

app.after(() => {
  app.get("/users", async (req, res) => {
    return res.send(
      await prisma.user.findMany({
        include: {
          groups: true,
        },
      })
    );
  });
  app.get("/groups", async (req, res) => {
    return res.send(
      await prisma.group.findMany({
        include: {
          users: true,
        },
      })
    );
  });
  app.get("/purchases", async (req, res) => {
    return res.send(
      await prisma.purchase.findMany({
        include: {
          products: {
            include: {
              debtors: true,
            },
          },
        },
      })
    );
  });
  app.delete("/purchases", async (req, res) => {
    await prisma.product.deleteMany();
    return res.send(await prisma.purchase.deleteMany());
  });
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`
  🚀 Server ready at: http://localhost:3000
  ⭐️ See sample requests: http://pris.ly/e/ts/rest-fastify#3-using-the-rest-api`);
});
