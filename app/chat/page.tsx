"use client"

import React from 'react'
import { useChat } from "@ai-sdk/react"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function page() {
  const { messages, input, handleInputChange, handleSubmit} = useChat({ 
    api: "/api/genai"
  })
  return (
    <div>
      <div>
        {messages.map(message => {
          return (
            <div key={message.id}>
              <p>{message.role}</p>
              {message.content}
            </div>
          )
        })}
      </div>
      <Input placeholder='Type anything...' value={input} onChange={handleInputChange}/>
      <Button type="submit" onClick={handleSubmit}></Button>
    </div>
  )
}

