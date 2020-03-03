import { agent } from 'supertest';
import app from './app';
describe('Integration test', () => {
  it('Example test', async () => {
    const response = await agent(app).get('/');
    expect(response.status).toBe(200);
  });
});
