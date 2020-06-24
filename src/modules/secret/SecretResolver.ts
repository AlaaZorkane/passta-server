import { Resolver, Mutation, Arg, Query, Ctx, UseMiddleware } from "type-graphql";
import { Secret } from "@/entity/Secret";
import { AddInput } from "./inputs/AddInput";
import { decryptData, encryptData } from "@/utils/crypto";
import { isAuth } from "@/utils/auth";

const encryptionOptions = (key: string) => ({
  key,
  ivLength: 16,
  algorithm: "aes-256-cbc",
});

@Resolver()
export class SecretResolver {
  @Query(() => Secret, { nullable: true })
  @UseMiddleware(isAuth)
  async secret(
    @Arg("name") name: string,
    @Ctx() { payload }: Passta.Context,
  ): Promise<Secret | undefined> {
    const encryptedSecret = await Secret.findOne({ where: { name } });
    if (!encryptedSecret) throw new Error("Secret not found");
    const decryptedSecret = {
      ...encryptedSecret,
      password: decryptData(
        Buffer.from(encryptedSecret.password, "base64"),
        encryptionOptions(payload.key),
      ).toString("utf8"),
    };
    return decryptedSecret as Secret;
  }
  @Mutation(() => Secret)
  @UseMiddleware(isAuth)
  async addSecret(
    @Arg("data") secretData: AddInput,
    @Ctx() { payload }: Passta.Context,
  ): Promise<Secret> {
    const { password } = secretData;
    const encryptedPassword = encryptData(
      Buffer.from(password, "utf8"),
      encryptionOptions(payload.key),
    ).toString("base64");
    console.log(encryptedPassword);
    const secret = await Secret.create({
      ...secretData,
      password: encryptedPassword,
    }).save();
    return secret;
  }
}
