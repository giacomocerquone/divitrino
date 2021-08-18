import { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import * as jwt from "../jwt";
import { prisma } from "..";
import httpErrors from "http-errors";

export default async function (app: FastifyInstance) {
  app.post<{
    Body: ISignupBody;
  }>(`/signup`, async (req, res) => {
    const { name, email, password, groupId, groupName } = req.body;
    const cryptedPwd = bcrypt.hashSync(password, 8);

    if (!name || (!groupName && !groupId) || !email || !password) {
      return res.send(new httpErrors.BadRequest("Missing signup data"));
    }

    const result = await prisma.user.create({
      data: {
        name,
        email,
        password: cryptedPwd,
        groups: {
          connectOrCreate: {
            where: {
              id: groupId || "",
            },
            create: {
              name: groupName || "",
            },
          },
        },
      },
    });

    try {
      const token = await jwt.sign({ name, email, id: result.id });
      res.send({ ...result, accessToken: token });
    } catch (e) {
      res.send(e);
    }
  });

  app.post<{
    Body: ILoginBody;
  }>(`/login`, async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        name: true,
        email: true,
        id: true,
        password: true,
        groups: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) {
      return res.send(new httpErrors.NotFound("User not registered"));
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword)
      return res.send(
        new httpErrors.Unauthorized("Email or password not valid")
      );

    const { password: userPwd, ...otherUserInfo } = user;
    const accessToken = await jwt.sign(user);

    return res.send({ ...otherUserInfo, accessToken });
  });
}

interface ISignupBody {
  name: string;
  email: string;
  password: string;
  groupId: string;
  groupName: string;
}

interface ILoginBody {
  email: string;
  password: string;
}
