import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import dotenv from "dotenv";
import httpErrors from "http-errors";
import fastifyAuth from "fastify-auth";
import pointOfView from "point-of-view";
import cors from "fastify-cors";
import ejs from "ejs";
import path from "path";

import * as jwt from "./jwt";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import movementRouter from "./routes/movement";

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
      throw new httpErrors.Unauthorized((e as Error).message);
    }
  })
  .register(fastifyAuth)
  .register(cors, {
    origin: false,
  })
  .register(pointOfView, {
    root: path.join(__dirname, "templates"),
    engine: {
      ejs,
    },
  })
  .register(authRouter)
  .register(userRouter)
  .register(movementRouter);

app.after(() => {
  app.get<{ Querystring: { code: string; inviteId: string } }>(
    "/open-invite",
    async (req, res) => {
      const { code, inviteId } = req.query;

      return res.view("./open-invite.ejs", {
        code,
        inviteId,
        appScheme: process.env.APP_SCHEME,
      });
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
