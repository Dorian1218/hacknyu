import { config } from '@/plaid';
import { NextRequest, NextResponse } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from 'plaid';

const client = new PlaidApi(config);
export async function POST(req: NextRequest) {
    const {access_token} = await req.json()
    try {
        console.log("ACCESS TOKEN " + access_token)
        const response = await client.transactionsGet({
            access_token: access_token,
            start_date: "2024-01-01",
            end_date: "2024-12-31",
            options: {
                offset: 0
            }
        })
        return NextResponse.json(response.data)
    } catch (e) {
        console.error("Error fetching transactions:", e);
        return NextResponse.json({ error: 'Error getting transactions' }, { status: 500 });
    }
}