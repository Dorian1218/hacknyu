"use client"

import React, { useEffect, useState } from 'react'
import { useChat } from "@ai-sdk/react"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTransaction } from '@/context/TransactionsContext'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import ReactMarkdown from "react-markdown"

export default function page() {
  const { user } = useAuth()
  const { transactions } = useTransaction();
  const [dbUser, setDbUser] = useState({
    firstName: "",
    lastName: "",
  })
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: { transactions },
  });
  
  useEffect(() => {
    const getName = async () => {
      if (user) {
        await axios.post("/api/firebase/get-name", { id: user.uid }).then((res) => {
          const key = Object.keys(res.data)[0]
          setDbUser({ firstName: res.data[key].firstName, lastName: res.data[key].lastName })
        })
      }
    }
    getName()
  }, [user])

  return (
    <div className='h-screen flex flex-col justify-between p-5 items-center w-full'>
      {messages.length > 0 && <div className='flex flex-col w-full overflow-y-auto mb-4' style={{ maxHeight: 'calc(100vh - 100px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
            div::-webkit-scrollbar {
                display: none;
            }
        `}</style>
        {messages.map((message, key) => (
          <div
            key={key}
            className={`p-2 my-2 rounded-md flex gap-2 ${message.role === 'user' ? 'bg-blue-500 self-end' : 'bg-gray-300 self-start'}`}
          >
            {message.role === 'user' ? `${dbUser.firstName}: ` : 'AI: '}
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ))}
        {isLoading && <p>Loading...</p>}
      </div>}
      {messages.length === 0 && <div className='w-full h-full flex justify-center items-center'>
        <p className='text-3xl'>Financial AI Bot</p>
      </div>}
      <div className="flex flex-row gap-4 w-full">
        <Input name="prompt" value={input} onChange={handleInputChange} placeholder='Talk about transactions or financial questions' />
        <Button type="submit" onClick={handleSubmit}>Ask Away</Button>
      </div>
    </div>
  )
}

