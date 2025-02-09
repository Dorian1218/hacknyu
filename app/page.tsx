"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Vector from "../public/reshot-icon-heap-money-ZXJTCVSRML.svg";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  return (
    <div className="flex flex-row gap-10 items-center justify-center min-h-screen w-screen">
      <div className="flex flex-col">
        <p className="text-5xl mb-2">WealthWise</p>
        <p className="text-lg mb-2">AI-Based Financial Assistant for Gen Z</p>
        <div className="flex gap-2">
          <Button className="bg-sky-400" onClick={() => router.push("/login")}>Login</Button>
          <Button onClick={() => router.push("/signup")}>Sign Up</Button>
        </div>
      </div>
      <Image
        priority
        src={Vector}
        alt="Vector"
        width={300}
        height={300}
      />
    </div>
  );
}
