"use client"

import { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTransaction } from '@/context/TransactionsContext';

export default function Home() {
  const router = useRouter()
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const { user } = useAuth()
  const { setTransactions } = useTransaction();
  console.log(user)
  useEffect(() => {
    const createLinkToken = async () => {
      try {
        if (user) {
          const response = await axios.post('/api/plaid/create-link-token', {
            client_user_id: user?.uid
          });
          setLinkToken(response.data.link_token);
        }
      } catch (error) {
        console.error('Error generating link token:', error);
      }
    };
    createLinkToken();
  }, [user]);
  const onSuccess = async (public_token: string) => {
    try {
      await axios.post('/api/plaid/exchange-token', {
        public_token,
      }).then(async (response) => {
        await axios.post("/api/plaid/get-transactions", {access_token: response.data.access_token}).then((res) => {
          setTransactions(res.data.transactions)
          router.push('/dashboard')
        })
      })
    } catch (error) {
      console.error('Error exchanging public token:', error);
    }
  };
  const { open, ready } = usePlaidLink({
    token: linkToken!,
    onSuccess,
  });
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      {linkToken && (
        <div className='flex items-center flex-col gap-2'>
          <p className='text-2xl'>Connect Bank Account to App</p>
          <Button onClick={() => open()} disabled={!ready}>
            Connect Bank
          </Button>
        </div>
      )}
    </div>
  );
}
