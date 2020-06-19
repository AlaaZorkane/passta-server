import { InputType, Field } from "type-graphql";
import { Secret } from "@/entity/Secret";

@InputType({ description: "Add a secret" })
export class AddInput implements Partial<Secret> {
  @Field()
  name: string;

  @Field({ nullable: true })
  username?: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  notes?: string;
}
