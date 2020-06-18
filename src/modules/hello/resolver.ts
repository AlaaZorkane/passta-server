import Hello from "./schema";
import { Query, Resolver } from "type-graphql";

const mock: Hello[] = [
  {
    id: "1",
    who: "world",
  },
  {
    id: "2",
    who: "typescript",
  },
  {
    id: "3",
    who: "1337",
  },
];

@Resolver()
class HelloResolver {
  private helloCollection: Hello[] = mock;

  @Query(() => [Hello])
  hellos(): Hello[] {
    return this.helloCollection;
  }
}

export default HelloResolver;
