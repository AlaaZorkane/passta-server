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
  @UseMiddleware(isAuth)
  @Query(() => [Secret], { nullable: true })
  async secrets(
    @Arg("name") name: string,
    @Ctx() { payload }: Passta.Context,
  ): Promise<Secret[] | undefined> {
    const encryptedSecrets = await Secret.find({ where: { name } });
    if (!encryptedSecrets) throw new Error("no secret was found");
    const secretsCollection: Secret[] = [];
    encryptedSecrets.forEach((secret) => {
      const decryptedSecret = {
        ...secret,
        password: decryptData(secret.password, encryptionOptions(payload.key)),
      };
      secretsCollection.push(<Secret>decryptedSecret);
    });
    return secretsCollection;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Secret)
  async addSecret(
    @Arg("data") secretData: AddInput,
    @Ctx() { payload }: Passta.Context,
  ): Promise<Secret> {
    const { password } = secretData;
    const encryptedPassword = encryptData(password, encryptionOptions(payload.key));
    console.log(encryptedPassword);
    const secret = await Secret.create({
      ...secretData,
      password: encryptedPassword,
    }).save();
    return secret;
  }
}
