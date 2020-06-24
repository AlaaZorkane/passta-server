import { InputType, Field } from "type-graphql";
import { User } from "@/entity/User";
import { Length, MinLength } from "class-validator";

@InputType({ description: "Initial server setup" })
export class SetupInput implements Partial<User> {
  @Field()
  @Length(6, 32)
  username: string;

  @Field({ description: "Master password" })
  @MinLength(8)
  master: string;
}
