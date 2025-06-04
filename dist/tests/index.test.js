"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
describe('API tests', () => {
    let server;
    const TEST_USER = {
        email: 'lead@example.com',
        name: 'Lead User',
        age: 35,
        gender: 'female',
        interest: 'Leads',
    };
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
    beforeAll(async () => {
        server = (0, index_1.createApolloServer)();
        await server.start();
        // Register user once before all tests
        const res = await server.executeOperation({
            query: REGISTER_MUTATION,
            variables: { input: TEST_USER },
        });
        if (res.body.kind !== 'single') {
            throw new Error('User registration failed during setup.');
        }
    });
    afterAll(async () => {
        await server.stop();
    });
    it('registers a user', async () => {
        // Already registered in beforeAll — this test just ensures it's there
        const res = await server.executeOperation({
            query: REGISTER_MUTATION,
            variables: { input: TEST_USER },
        });
        if (res.body.kind === 'single') {
            const data = res.body.singleResult.data;
            expect(res.body.singleResult.errors).toBeUndefined();
            expect(data.register.email).toBe(TEST_USER.email);
        }
        else {
            throw new Error('Expected single response but got incremental.');
        }
    });
    it('selects a single lead by name', async () => {
        const GET_LEAD_BY_NAME_QUERY = `
      query GetLeadByName($name: String!) {
        lead(name: $name) {
          email
          name
          age
          gender
          interest
        }
      }
    `;
        const res = await server.executeOperation({
            query: GET_LEAD_BY_NAME_QUERY,
            variables: { name: TEST_USER.name },
        });
        if (res.body.kind === 'single') {
            const lead = res.body.singleResult.data.lead;
            expect(lead).toBeDefined();
            expect(lead.name).toBe(TEST_USER.name);
            expect(lead.email).toBe(TEST_USER.email);
        }
        else {
            throw new Error('Expected single response but got incremental.');
        }
    });
    it('selects all leads', async () => {
        const GET_ALL_LEADS_QUERY = `
      query GetAllLeads {
        leads {
          email
          name
        }
      }
    `;
        const res = await server.executeOperation({
            query: GET_ALL_LEADS_QUERY,
        });
        if (res.body.kind === 'single') {
            const leads = res.body.singleResult.data.leads;
            expect(Array.isArray(leads)).toBe(true);
            expect(leads.length).toBeGreaterThan(0);
            expect(leads.some(l => l.name === TEST_USER.name)).toBe(true);
        }
        else {
            throw new Error('Expected single response but got incremental.');
        }
    });
});
