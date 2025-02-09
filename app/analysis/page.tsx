"use client"

import { Button } from '@/components/ui/button'
import { useTransaction } from '@/context/TransactionsContext';
import { useChat } from '@ai-sdk/react'
import axios from 'axios';
import React, { useState } from 'react'

export default function page() {
    const { transactions } = useTransaction();
    const [overview, setOverview] = useState()
    const [loading, setLoading] = useState(false);
    const [pressed, setPressed] = useState(false);
    const ParsedText = ({ text }: any) => {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: text,
            }}
          />
        );
      };
      const handleFetchOverview = async () => {
        setLoading(true)
        await axios.post('/api/analysis', {transactions: transactions}).then(async (res) => {
            const data = res.data
            let cleanResponse = data || '';

        // Step 1: Remove any extraneous keys like 'f:', 'e:', etc.
        cleanResponse = cleanResponse.replace(/^f:.*?$/gm, '');  // Remove any 'f:' lines

        // Step 2: Format the content with Markdown (or HTML if preferred)
        cleanResponse = cleanResponse
            .replace(/(\*\*[\w\s]*\*\*)/g, '<strong>$1</strong>') // Bold text
            .replace(/(\d+\. [\w\W]+)(?=\n\n|\s*\n)/g, '<p>$1</p>') // Wrap each tip in <p> tags
            .replace(/\n/g, '<br/>').replace(/^\d+:"/g, '').replace(/"/g, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^0:/gm, '').replace(/\n/g, ' ').replace(/e:{.*?}/g, '')
            setOverview(cleanResponse);
            setPressed(true)
            setLoading(false)
        })
    }
  return (
    <div className='p-5'>
        <Button onClick={handleFetchOverview} className={`${pressed && "hidden"}`}>Generate Financial Overview</Button>
        {loading && <p>Loading...</p>}
        <ParsedText text={overview} />
    </div>
  )
}
