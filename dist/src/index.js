"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApolloServer = void 0;
// server.ts
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
// Define GraphQL schema
const typeDefs = `#graphql
  type User {
    email: String!
    name: String!
    age: Int
    gender: String
    interest: String!
  }

  input UserInput {
    email: String!
    name: String!
    age: Int
    gender: String
    interest: String!
  }

  input UserFilterInput {
    name: String
  }

  type Query {
    users(filter: UserFilterInput): [User!]!
  }

  type Mutation {
    register(input: UserInput!): User!
  }
`;
// In-memory storage
const users = [];
// Filter function with types
function applyFilters(data, filters = {}) {
    return data.filter(item => Object.entries(filters).every(([key, value]) => value === undefined ? true : item[key] === value));
}
// Resolvers
const resolvers = {
    Query: {
        users: (_, { filter }) => applyFilters(users, filter),
    },
    Mutation: {
        register: (_, { input }) => {
            const newUser = { ...input };
            users.push(newUser);
            return newUser;
        },
    },
};
// Export server for testing
const createApolloServer = () => new server_1.ApolloServer({
    typeDefs,
    resolvers,
});
exports.createApolloServer = createApolloServer;
// Start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    const server = (0, exports.createApolloServer)();
    (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
    }).then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
}
