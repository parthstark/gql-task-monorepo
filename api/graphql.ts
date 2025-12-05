import { ApolloServer } from "apollo-server-lambda";
import { db } from "../src/db";
import { apolloConfig } from "../src/apollo-config";

const server = new ApolloServer({
  ...apolloConfig,
  context: async () => {
    await db.read();
    return {};
  },
});

export default server.createHandler();