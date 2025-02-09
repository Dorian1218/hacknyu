"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTransaction } from '@/context/TransactionsContext';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function page() {
  const router = useRouter()
  const { transactions } = useTransaction();

  return (
    <div className='flex flex-row p-5'>
      <div className='w-2/3 h-screen flex flex-col gap-2'>
        <div>
          <p className='text-3xl'>Financial Summary</p>
          <p className='text-xl'>Transactions</p>
        </div>
        <div className="space-y-4 overflow-y-auto h-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
      <div className='w-1/3 h-screen flex flex-col justify-center items-center p-5 gap-2'>
        <p className='text-3xl'>Advice</p>
        <Button onClick={() => router.push("/analysis")} className='w-full bg-sky-400'>Generate AI Overview</Button>
        <p>Optimize your spending in seconds</p>
        <p>or</p>
        <Button onClick={() => router.push("/chat")} className='w-full'>Chat with AI</Button>
        <p>Example Prompts: </p>
        <p>How much did I spend on Uber in 2024?</p>
        <p>How can I get started in Investing?</p>
      </div>
    </div>
  )
}
