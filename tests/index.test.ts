import { ApolloServer, BaseContext } from '@apollo/server';
import { createApolloServer } from '../src/index';

describe('API tests', () => {
  let server: ApolloServer<BaseContext>;

  beforeAll(async () => {
    server = createApolloServer();
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  it('registers user', async () => {
    const REGISTER_MUTATION = `
      mutation Register($input: UserInput!) {
        register(input: $input) {
          email
          name
          age
          gender
          interest
        }
      }
    `;

    const variables = {
      input: {
        email: 'test@example.com',
        name: 'Test User',
        age: 28,
        gender: 'non-binary',
        interest: 'GraphQL',
      },
    };

    const res = await server.executeOperation({ query: REGISTER_MUTATION, variables });

    console.dir(res, { depth: null }); // Debug response

    // expect(res.errors).toBeUndefined();
    // expect(res.data?.register.email).toBe('test@example.com');
  });
});
