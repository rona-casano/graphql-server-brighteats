// server.ts
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { v4 as uuidv4 } from 'uuid';

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

// Define TypeScript types
interface User {
  email: string;
  name: string;
  age?: number;
  gender?: string;
  interest: string;
}

interface UserInput extends User {}

interface UserFilterInput {
  name?: string;
}

// In-memory storage
const users: User[] = [];

// Filter function with types
function applyFilters(data: User[], filters: UserFilterInput = {}): User[] {
  return data.filter(item =>
    Object.entries(filters).every(([key, value]) =>
      value === undefined ? true : item[key as keyof User] === value
    )
  );
}

// Resolvers
const resolvers = {
  Query: {
    users: (_: unknown, { filter }: { filter?: UserFilterInput }): User[] =>
      applyFilters(users, filter),
  },
  Mutation: {
    register: (_: unknown, { input }: { input: UserInput }): User => {
      const newUser: User = { ...input };
      users.push(newUser);
      return newUser;
    },
  },
};

// Export server for testing
export const createApolloServer = () =>
  new ApolloServer({
    typeDefs,
    resolvers,
  });

// Start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  const server = createApolloServer();
  startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}
