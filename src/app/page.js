"use client"

import { auth, entrarComGoogle } from "@/firebase/authentication"
import { useEffect } from "react"
import { FcGoogle } from "react-icons/fc"





export default function Home() {
 
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        window.location.href = '/home'
      }
    })
    
  }, [])

  function executar(){
    entrarComGoogle()
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <button
        className="w-[300px] h-[100px] flex items-center gap-2 px-10 bg-slate-300 rounded-md font-bold"
        onClick={() => executar()}
      >
        <FcGoogle className="h-12 w-12" />
        Entrar com o Google
      </button>

    </main>

  )
}
