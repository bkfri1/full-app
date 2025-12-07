'use client'

import { useGetCookie, useHasCookie } from "cookies-next";
import InputCard from "./input-card";
import Tasks from "./tasks";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useModal } from "react-modal-hook";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SplitText from "@/components/split-text";

export default function Page() {
  const hasCookie = useHasCookie()

  const getCookie = useGetCookie()

  const logout = useMutation(api.server.logout);

  const router = useRouter();

  const cookieRef = useRef('');

  const [showModal, hideModal] = useModal(() => (
    <Dialog open={true} onOpenChange={hideModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Are you sure you want to log out?</DialogTitle>
          <div className="flex justify-stretch w-full gap-1">
          <Button
            className="w-1/2"
            onClick={async() => {
                    await logout({token: cookieRef.current})
                    //deleteCookie('token')
                    document.cookie = 'token=; Max-Age=0; path=/';
                    router.push('/login')
            }}>
            Yes
          </Button>
          <Button className="w-1/2" onClick={hideModal}>No go back</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ))

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
    <div className="bg-gray-400/50 dark:bg-gray-800 w-fit mx-auto p-10 my-10 rounded-2xl relative">
      <Button 
      title="Log out"
      variant={"secondary"} 
      className="top-5 right-5 absolute"
      onClick={async() => {
        cookieRef.current = getCookie('token') as string;
        showModal()
      }}
      >
      <LogOut/>
      </Button>
      <SplitText
        text="Task Manager"
        className="text-2xl font-semibold mb-5 text-center"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />        
      <InputCard />
      <Tasks />
    </div>
  )
}