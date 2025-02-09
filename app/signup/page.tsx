"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { useAuth } from "@/context/AuthContext"
import { useRouter } from 'next/navigation'

export default function page() {
    const router = useRouter()
    const [data, setData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        confirmPassword: ""
    })
    const { signup, signIn } = useAuth()
    const handleSubmit = async () => {
        await signup(data.email, data.password).then(async () => {
            await signIn(data.email, data.password).then(() => {
                router.push("/linkbankaccount") 
            })
        })
    }
    return (
        <div className='w-screen h-screen flex'>
            <div className='w-1/2 flex flex-col h-screen bg-sky-400 justify-center items-center'>
                <p className='text-3xl mb-2'>Create Your Free Account</p>
                <p>Manage your finances and expenses with advice specifically for you </p>
            </div>
            <div className='w-1/2 h-screen flex flex-col justify-center items-center gap-7 p-5'>
                <div className='flex gap-2 w-full'>
                    <div className='w-full'>
                        <Label>First name *</Label>
                        <Input value={data.firstName} onChange={(e) => setData(prevData => ({ ...prevData, firstName: e.target.value }))} />
                    </div>
                    <div className='w-full'>
                        <Label>Last name *</Label>
                        <Input value={data.lastName} onChange={(e) => setData(prevData => ({ ...prevData, lastName: e.target.value }))} />
                    </div>
                </div>
                <div className='w-full'>
                    <Label>Email *</Label>
                    <Input value={data.email} onChange={(e) => setData(prevData => ({ ...prevData, email: e.target.value }))} />
                </div>
                <div className='w-full'>
                    <Label>Password *</Label>
                    <Input value={data.password} type='password' onChange={(e) => setData(prevData => ({ ...prevData, password: e.target.value }))} />
                </div>
                <div className='w-full'>
                    <Label>Confirm Password *</Label>
                    <Input value={data.confirmPassword} type='password' onChange={(e) => setData(prevData => ({ ...prevData, confirmPassword: e.target.value }))} />
                </div>
                <Button className='w-full bg-sky-400' onClick={() => handleSubmit()}>Continue</Button>
            </div>
        </div>
    )
}
