import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { User } from "@/entity/User";
import { Secret } from "@/entity/Secret";
import { AddInput } from "./inputs/AddInput";

@Resolver()
export class SecretResolver {
  @Query(() => String)
  secret(): string {
    return "pong!";
  }
  @Mutation(() => Secret)
  async addSecret(@Arg("data") secretData: AddInput): Promise<User> {
    const secret = await Secret.create({
      ...secretData,
    }).save();
    return secret;
  }
}
