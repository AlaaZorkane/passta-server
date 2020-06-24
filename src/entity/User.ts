import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  master: string;
}
