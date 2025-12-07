import { typeDefs } from "./gql-config/schema";
import { resolvers } from "./gql-config/resolvers";

export const apolloConfig = {
  typeDefs,
  resolvers,
  formatError: (err: any) => ({
    message: err.message,
    code: err.extensions?.code,
  }),
};