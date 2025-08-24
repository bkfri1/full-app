'use client'

import InputCard from "./input-card";
import Tasks from "./tasks";

export default function Page() {
    return(
      <div className="bg-gray-800 w-fit mx-auto p-10 my-10 rounded-2x1">
         <h1 className="text-center text-3xl p-5">Task Manager</h1>
        <InputCard/>
        <Tasks/>
      </div>
    )
}