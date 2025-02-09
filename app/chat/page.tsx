"use client"

import React from 'react'
import { useChat } from "@ai-sdk/react"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTransaction } from '@/context/TransactionsContext'

export default function page() {
  const { transactions } = useTransaction();
  console.log(transactions)
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/genai",
    body: { transactions }
  })

  return (
    <div className='h-screen flex flex-col justify-between p-5 items-center'>
      <div className='flex flex-col w-full overflow-y-auto mb-4' style={{ maxHeight: 'calc(100vh - 100px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
            div::-webkit-scrollbar {
                display: none;
            }
        `}</style>
        {messages.map(message => (
          <div
            key={message.id}
            className={`p-2 my-2 rounded-md ${message.role === 'user' ? 'bg-blue-500 self-end' : 'bg-gray-300 self-start'}`}
          >
            {message.role === 'user' ? 'User: ' : 'AI: '}
            {message.content}
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-4 w-full">
        <Input name="prompt" value={input} onChange={handleInputChange} />
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}

