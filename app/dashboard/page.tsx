"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTransaction } from '@/context/TransactionsContext';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function page() {
  const router = useRouter()
  const { transactions } = useTransaction();
  console.log(transactions)

  return (
    <div className='flex flex-col min-h-screen p-5 gap-3'>
      <div className='flex justify-between'>
        <div>
          <p className='text-3xl'>Dashbaord</p>
          <p className='text-2xl'>Transactions</p>
        </div>
        <Button onClick={() => router.push("/chat")}>Chat with AI for insight on your finances</Button>
      </div>
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (<div className='flex flex-col gap-2'>{
          transactions.map((transaction: any, index: number) => (
            <div key={index} className="border p-4 rounded-lg shadow-md flex flex-col gap-2">
              <p className="text-lg font-semibold">{transaction.name}</p>
              <p className="text-gray-600">${transaction.amount.toFixed(2)}</p>
              <p className="text-gray-400 text-sm">{transaction.date}</p>
              <div className='flex gap-2'>
                {transaction.category.map((category: string, index: number) => (
                  <Badge variant="outline" key={index}>{category}</Badge>
                ))}
              </div>
            </div>
          ))}</div>
        )}
      </div>
    </div>
  )
}
