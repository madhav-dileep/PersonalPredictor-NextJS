"use client"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react";
export default function Home() {

  const [inputVal, setInputVal] = useState('')
  const {push} = useRouter()

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    push(`/prediction/${inputVal}`)
  }
  return (
    <main style={{minHeight:'100vh'}} className="flex justify-center items-center flex-col gap-12">
      <h1 className="text-5xl ">Enter Your Name</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e)=>{setInputVal(e.target.value)}} placeholder="type in your name" className="p-4 rounded-s text-black"/>
        <button type="submit" className="bg-blue-600 p-4 rounded-e">Predict</button>
      </form>
    </main>
  );
}
