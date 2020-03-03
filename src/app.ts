import express from 'express';
import rp from 'request-promise';

const app = express();
app.get('/', async (req, res) => {
  const stripePort = parseInt(process.env.STRIPE_PORT);
  console.log('Stripe is running on port: ', stripePort);

  const response = await rp({
    method: 'GET',
    uri: `http://localhost:${stripePort}/v1/customers`,
    headers: {
      Authorization: 'Bearer sk_test_123'
    }
  });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(response);
});

export default app;
