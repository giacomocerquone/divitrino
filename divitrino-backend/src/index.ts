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
const app = fastify({ logger: process.env.NODE_ENV !== "production" });

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
  app.get<{ Querystring: { groupId: string; code: string; inviteId: string } }>(
    "/open-invite",
    async (req, res) => {
      const { groupId, code, inviteId } = req.query;

      // TODO add html page with metadata to make a nicer preview for crawlers
      // and also a text to invite users to download the app
      // with a redirect countdown

      res.type("text/html").send(`<html><body>
        <a href="exp://192.168.1.73:19000/--/join?groupId=${groupId}&code=${code}&inviteId=${inviteId}">Apri divitrino</a>
        </body></html> `);
    }
  );
});

app.listen(process.env.PORT || 3000, process.env.IP || "localhost", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`
  🚀 Server ready at: http://${process.env.IP || "localhost"}:${
    process.env.PORT || 3000
  }
  ⭐️ See sample requests: http://pris.ly/e/ts/rest-fastify#3-using-the-rest-api`);
});
