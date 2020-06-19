import { buildSchema } from "type-graphql";
import { SetupResolver } from "@/modules/user/Setup";
import { GraphQLSchema } from "graphql";
import { SecretResolver } from "@/modules/secret/SecretResolver";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [SetupResolver, SecretResolver],
    dateScalarMode: "timestamp",
  });
