"use strict";
// import { ApolloServer, BaseContext } from '@apollo/server';
// import { createApolloServer } from '../src/index';
// import gql from 'graphql-tag';
// describe('API tests', () => {
//   let server: ApolloServer<BaseContext>;
//   beforeAll(async () => {
//     server = createApolloServer();
//     await server.start();  // <== crucial
//   });
//   afterAll(async () => {
//     await server.stop();
//   });
//   it('registers user', async () => {
//     const REGISTER_MUTATION = gql`
//       mutation Register($input: UserInput!) {
//         register(input: $input) {
//           email
//           name
//           interest
//         }
//       }
//     `;
//     const variables = {
//       input: {
//         email: 'test@example.com',
//         name: 'Test User',
//         age: 28,
//         gender: 'non-binary',
//         interest: 'GraphQL',
//       },
//     };
//     const res = await server.executeOperation({ query: REGISTER_MUTATION, variables });
//     console.log(res); // Check the entire response!
//     expect(res.errors).toBeUndefined();
//     expect(res.data?.register.email).toBe('test@example.com');
//   });
// });
