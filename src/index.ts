// server.js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    age: Int
    role: String
    isActive: Boolean
  }

  input UserFilterInput {
    name: String
    age: Int
    role: String
    isActive: Boolean
  }

  type Query {
    users(filter: UserFilterInput): [User!]!
  }
`;

const users = [
  { id: '1', name: 'Alice', age: 30, role: 'admin', isActive: true },
  { id: '2', name: 'Bob', age: 25, role: 'user', isActive: false },
  { id: '3', name: 'Carol', age: 30, role: 'user', isActive: true },
];

function applyFilters(data, filters = {}) {
  return data.filter(item =>
    Object.entries(filters).every(([key, value]) =>
      value === undefined ? true : item[key] === value
    )
  );
}

const resolvers = {
  Query: {
    users: (_, { filter }) => {
      const result = applyFilters(users, filter);
      console.log("Filtered users:", result); // 👈 Output to terminal
      return result;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
// This code sets up a simple Apollo Server with a GraphQL schema that includes a User type and a query to fetch users with optional filters.
// The applyFilters function is used to filter the users based on the provided input.