import { Resolver, Mutation, Arg, Field, ObjectType } from "type-graphql";
import { User } from "@/entity/User";
import bcrypt from "bcrypt";
import { createAccessToken } from "@/utils/auth";

@ObjectType()
class AccessResponse {
  @Field()
  accessToken: string;
  @Field()
  user: User;
}

@Resolver()
export class AccessResolver {
  @Mutation(() => AccessResponse, { nullable: true })
  async access(@Arg("master") master: string): Promise<AccessResponse | null> {
    const user = await User.findOne(1);
    if (!user) throw new Error("Try setuping the server first!");
    const valid = await bcrypt.compare(master, user.master);
    if (!valid) throw new Error("Incorrect password!");
    return {
      accessToken: await createAccessToken(master),
      user,
    };
  }
}
