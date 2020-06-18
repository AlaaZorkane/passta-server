import { buildSchema } from "type-graphql";
import HelloResolver from "@/modules/hello/resolver";
import { GraphQLSchema } from "graphql";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [HelloResolver],
  });
