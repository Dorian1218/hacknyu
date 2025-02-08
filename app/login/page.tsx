"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { useAuth } from "@/context/AuthContext"

export default function page() {
    const { signIn } = useAuth()
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    const handleSubmit = () => {
        signIn(data.email, data.password)
    }
    return (
        <div className='w-1/2 h-screen flex flex-col justify-center items-center gap-7 p-5'>
            <p className='text-3xl'>Login</p>
            <div className='w-full'>
                <Label>Email *</Label>
                <Input value={data.email} onChange={(e) => setData(prevData => ({...prevData, email: e.target.value})) }/>
            </div>
            <div className='w-full'>
                <Label>Password *</Label>
                <Input value={data.password} type='password' onChange={(e) => setData(prevData => ({...prevData, password: e.target.value})) }/>
            </div>
            <div className='w-full'>
                <Label>Confirm Password *</Label>
                <Input value={data.confirmPassword} type='password' onChange={(e) => setData(prevData => ({...prevData, confirmPassword: e.target.value})) }/>
            </div>
            <Button className='w-full bg-blue-500' onClick={() => handleSubmit}>Continue</Button>
        </div>
    )
}
