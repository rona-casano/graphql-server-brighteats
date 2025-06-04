import { ApolloServer, BaseContext } from '@apollo/server';
import { createApolloServer } from '../src/index';

describe('API tests', () => {
  let server: ApolloServer<BaseContext>;

  const TEST_LEAD = {
    email: 'lead@test.com',
    name: 'Jane Lead',
    age: 28,
    gender: 'female',
    interest: 'GraphQL',
  };

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

    const res = await server.executeOperation({
      query: REGISTER_MUTATION,
      variables,
    });

    if (res.body.kind === 'single') {
      const resultData = res.body.singleResult.data as {
        register: {
          email: string;
          name: string;
          age: number;
          gender: string;
          interest: string;
        };
      };

      expect(res.body.singleResult.errors).toBeUndefined();
      expect(resultData.register.email).toBe('test@example.com');
    } else {
      throw new Error('Expected single response but got incremental.');
    }
  });

});
