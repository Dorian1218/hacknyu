import { config } from '@/plaid';
import { NextRequest, NextResponse } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from 'plaid';

const client = new PlaidApi(config);
export async function POST(req: NextRequest) {
  try {
    const { client_user_id } = await req.json();
    const response = await client.linkTokenCreate({
      user: { client_user_id: client_user_id },
      client_name: "Plaid",
      products: [
        Products.Auth,
        Products.Transactions,
      ],
      country_codes: [CountryCode.Us, CountryCode.Ca],
      language: 'en',
    });
    return NextResponse.json({ link_token: response.data.link_token });
  } catch (error) {
    return NextResponse.json({ error: 'Error generating link token' }, { status: 500 });
  }
}