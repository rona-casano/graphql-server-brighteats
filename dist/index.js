// server.js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// GraphQL Schema
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
// Empty in-memory users array
const users = [];
// Filter utility
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
            console.log('New user registered:', newUser);
            return newUser;
        },
    },
};
// Start Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
