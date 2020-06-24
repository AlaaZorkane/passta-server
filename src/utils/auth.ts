import { V2 as paseto } from "paseto";
import { createHash, createSecretKey, KeyObject } from "crypto";
import APP_CONFIG from "@/config";
import { MiddlewareFn } from "type-graphql";

export const createSecret = (): KeyObject => {
  const hashedSecret = createHash("sha256")
    .update(APP_CONFIG.PASETO_SECRET)
    .digest("hex")
    .toString()
    .slice(32);
  const bufferedSecret = Buffer.from(hashedSecret, "utf8");
  return createSecretKey(bufferedSecret);
};

export const createAccessToken = async (master: string): Promise<string> => {
  const key = createHash("sha256").update(master).digest("hex");
  const secret = createSecret();
  return await paseto.encrypt({ key }, secret, {
    expiresIn: APP_CONFIG.PASETO_EXPIRE,
  });
};

export const isAuth: MiddlewareFn<Passta.Context> = async ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not authorized");
  }

  try {
    const token = authorization.split(" ")[1];
    const secret = createSecret();
    const payload = (await paseto.decrypt(token, secret)) as Passta.PASETOPayload;
    console.log(payload);
    context.payload = payload;
  } catch (err) {
    console.log(err);
    throw new Error("Not authorized");
  }

  return next();
};
