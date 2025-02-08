import { Configuration, PlaidEnvironments } from "plaid";

export const config = new Configuration({
  basePath: PlaidEnvironments[process.env.NEXT_PUBLIC_PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.NEXT_PUBLIC_PLAID_CLIENT_ID || '',
      'PLAID-SECRET': process.env.NEXT_PUBLIC_PLAID_SECRET || '',
    },
  },
});