"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen">
      <p className="text-5xl mb-2">Project</p>
      <p className="text-lg mb-2">AI-Based Financial Assistant for Gen Z & Neurodivergent Individuals</p>
      <div className="flex gap-2">
        <Button className="bg-blue-600" onClick={() => router.push("/login")}>Login</Button>
        <Button onClick={() => router.push("/signup")}>Sign Up</Button>
      </div>
    </div>
  );
}
