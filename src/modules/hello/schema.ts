import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
class Hello {
  @Field(() => ID)
  readonly id: string;

  @Field()
  who: string;
}

export default Hello;
