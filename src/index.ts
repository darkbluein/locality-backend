import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// typedefs
import { userTypeDefs } from "./models/User/typedefs";
import { authTypeDefs } from "./models/Auth/typedefs";
const typeDefs = [userTypeDefs, authTypeDefs];

// resolvers
import authResolvers from "./resolvers/auth";
const resolvers = {
  Query: {
    ...authResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
import config from "./config";
async function startApolloServer() {
  await startStandaloneServer(server, {
    listen: { port: config.app.port || 3000 },
  })
    .then(({ url }) => {
      console.log(`Server running at ${url}`);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

import mongoose from "mongoose";
const DB = config.database.mongodb.connectionString;
mongoose.connect(DB).then(() => {
  return startApolloServer();
});
