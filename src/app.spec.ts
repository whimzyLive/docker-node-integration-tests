import { agent } from 'supertest';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import app from './app';
describe('Integration test', () => {
  let container: StartedTestContainer;
  beforeAll(async () => {
    container = await new GenericContainer('stripemock/stripe-mock')
      .withExposedPorts(12111)
      .start();
  }, 100000);

  afterAll(async () => {
    await container.stop();
  });
  it('Example test', async () => {
    // get mapped port
    const mappedPort = container.getMappedPort(12111);
    process.env.STRIPE_PORT = mappedPort.toString();

    const response = await agent(app).get('/');
    expect(response.body).toEqual({
      data: [
        {
          address: null,
          balance: 0,
          created: 1234567890,
          currency: 'usd',
          default_source: null,
          delinquent: false,
          description: null,
          discount: null,
          email: null,
          id: 'cus_GfTCBoDZCBiyJI',
          invoice_prefix: '9FCB8FB',
          invoice_settings: {
            custom_fields: null,
            default_payment_method: null,
            footer: null
          },
          livemode: false,
          metadata: {},
          name: null,
          object: 'customer',
          phone: null,
          preferred_locales: [],
          shipping: null,
          sources: {
            data: [
              {
                created: 1234567890,
                customer: null,
                fingerprint: 'bJdSG6NFt667EElp',
                id: 'aliacc_1G88GbHEHbQuWINRVmLiAImb',
                livemode: false,
                metadata: {},
                object: 'alipay_account',
                payment_amount: 1000,
                payment_currency: 'usd',
                reusable: false,
                used: false,
                username: 'test@example.com'
              }
            ],
            has_more: false,
            object: 'list',
            url: '/v1/customers/cus_GfTCBoDZCBiyJI/sources'
          },
          subscriptions: {
            data: [
              {
                application_fee_percent: null,
                billing_cycle_anchor: 1234567890,
                billing_thresholds: null,
                cancel_at: 1234567890,
                cancel_at_period_end: false,
                canceled_at: 1234567890,
                collection_method: 'charge_automatically',
                created: 1234567890,
                current_period_end: 1234567890,
                current_period_start: 1234567890,
                customer: 'cus_GfTCBoDZCBiyJI',
                days_until_due: null,
                default_payment_method: null,
                default_source: null,
                default_tax_rates: [],
                discount: null,
                ended_at: 1234567890,
                id: 'sub_GfTDXn2pq9TIYx',
                items: {
                  data: [
                    {
                      billing_thresholds: null,
                      created: 1580749161,
                      id: 'si_GfTD1mmNYt9i02',
                      metadata: {},
                      object: 'subscription_item',
                      plan: {
                        active: true,
                        aggregate_usage: null,
                        amount: 2000,
                        amount_decimal: '2000',
                        billing_scheme: 'per_unit',
                        created: 1580749152,
                        currency: 'usd',
                        id: 'gold',
                        interval: 'month',
                        interval_count: 1,
                        livemode: false,
                        metadata: {},
                        nickname: null,
                        object: 'plan',
                        product: 'prod_GfTCFQBHpGgdju',
                        tiers: null,
                        tiers_mode: null,
                        transform_usage: null,
                        trial_period_days: null,
                        usage_type: 'licensed'
                      },
                      quantity: 1,
                      subscription: 'sub_GfTD3ghQc0EdYk',
                      tax_rates: []
                    }
                  ],
                  has_more: false,
                  object: 'list',
                  url: '/v1/subscription_items?subscription=sub_GfTDXn2pq9TIYx'
                },
                latest_invoice: null,
                livemode: false,
                metadata: {},
                next_pending_invoice_item_invoice: 1234567890,
                object: 'subscription',
                pending_invoice_item_interval: null,
                pending_setup_intent: null,
                pending_update: null,
                plan: {
                  active: true,
                  aggregate_usage: null,
                  amount: 2000,
                  amount_decimal: '2000',
                  billing_scheme: 'per_unit',
                  created: 1580749152,
                  currency: 'usd',
                  id: 'gold',
                  interval: 'month',
                  interval_count: 1,
                  livemode: false,
                  metadata: {},
                  nickname: null,
                  object: 'plan',
                  product: 'prod_GfTCFQBHpGgdju',
                  tiers: null,
                  tiers_mode: null,
                  transform_usage: null,
                  trial_period_days: null,
                  usage_type: 'licensed'
                },
                quantity: 1,
                schedule: null,
                start_date: 1234567890,
                status: 'active',
                tax_percent: null,
                trial_end: 1234567890,
                trial_start: 1234567890
              }
            ],
            has_more: false,
            object: 'list',
            url: '/v1/customers/cus_GfTCBoDZCBiyJI/subscriptions'
          },
          tax_exempt: 'none',
          tax_ids: {
            data: [
              {
                country: 'DE',
                created: 1234567890,
                customer: 'cus_GfTCBoDZCBiyJI',
                id: 'txi_123456789',
                livemode: false,
                object: 'tax_id',
                type: 'eu_vat',
                value: 'DE123456789',
                verification: {
                  status: 'pending',
                  verified_address: null,
                  verified_name: null
                }
              }
            ],
            has_more: false,
            object: 'list',
            url: '/v1/customers/cus_GfTCBoDZCBiyJI/tax_ids'
          }
        }
      ],
      has_more: false,
      object: 'list',
      url: '/v1/customers'
    });
  });
});
