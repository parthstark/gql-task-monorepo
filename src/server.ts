import { ApolloServer } from "apollo-server";
import { db } from "./db";
import { apolloConfig } from "./apollo-config";

const start = async () => {
  await db.read();
  const server = new ApolloServer(apolloConfig);
  const { url } = await server.listen({ port: 4000 });
  console.log(`🚀 Server running at ${url}`);
};

start();
