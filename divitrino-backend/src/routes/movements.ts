import { FastifyInstance } from "fastify";
import httpErrors from "http-errors";

export default async function (app: FastifyInstance) {
  app.post<{ Body: any }>("/movement", async (req, res) => {
    const { description, payerId, products, groupId, date } = req.body;

    if (!date || !payerId || !description || !products?.length || !groupId) {
      return res.send(new httpErrors.BadRequest("Stuff is needed bro"));
    }
  });
}
