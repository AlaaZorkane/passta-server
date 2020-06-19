import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { User } from "@/entity/User";
import { SetupInput } from "@/modules/user/inputs/SetupInput";
import bcrypt from "bcrypt";

@Resolver()
export class SetupResolver {
  @Query(() => String)
  ping(): string {
    return "pong!";
  }
  @Mutation(() => User)
  async setup(@Arg("data") { username, password }: SetupInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
    }).save();
    return user;
  }
}
