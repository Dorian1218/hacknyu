import React from 'react'
import {useChat} from "@ai-sdk/react"

export default function page() {
  const {messages, input, handleInputChange, handleSubmit, isLoading, stop, reload} = useChat({api: "/api/genai"})
  return (
    <div>page</div>
  )
}

