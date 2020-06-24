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
  @Mutation(() => User, { nullable: true })
  async setup(@Arg("data") { username, master }: SetupInput): Promise<User | null> {
    const alreadySetup = await User.findOne(1);
    if (alreadySetup) throw new Error("setup already done");
    const hashedMaster = await bcrypt.hash(master, 10);
    const user = await User.create({
      id: 1,
      username,
      master: hashedMaster,
    }).save();
    return user;
  }
}
