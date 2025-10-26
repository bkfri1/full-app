'use client'

import { useHasCookie } from "cookies-next";
import InputCard from "./input-card";
import Tasks from "./tasks";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function Page() {
  const hasCookie = useHasCookie()

  const router = useRouter();

  useEffect(() => {
    const token = hasCookie('token')
    if (token===undefined) return;
    if (!token) {
      router.push('/register')
    }
  }, [hasCookie, router])

  // If there's no token, render nothing (we redirect in useEffect). Otherwise render app
  if (!hasCookie('token')) {
    return <div className="h-screen flex items-center justify-center">
      <Loader className="animate-spin text-white m-auto"></Loader>
    </div>

  }

  return (
    <div className="bg-gray-800 w-fit mx-auto p-10 my-10 rounded-2xl">
      <h1 className="text-center text-white text-3xl p-5">Task Manager</h1>
      <InputCard />
      <Tasks />
    </div>
  )
}