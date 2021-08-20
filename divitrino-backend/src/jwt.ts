import jwt from "jsonwebtoken";
import httpErrors from "http-errors";

const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const sign = (body: { name: string; email: string; id: string }) =>
  new Promise<string | undefined>((res, rej) => {
    if (!tokenSecret) {
      return rej(
        new httpErrors.InternalServerError("Token secret not defined")
      );
    }

    jwt.sign(body, tokenSecret, (err: any, token?: string) => {
      if (err || !token) {
        rej(err);
      }

      res(token);
    });
  });

export const verify = (token: string) => {
  return new Promise((res, rej) => {
    if (!tokenSecret) {
      return rej(
        new httpErrors.InternalServerError("Token secret not defined")
      );
    }

    jwt.verify(token, tokenSecret, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return rej(new httpErrors.Unauthorized(message));
      }

      res(payload);
    });
  });
};
