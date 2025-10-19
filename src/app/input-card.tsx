import { useMutation } from "convex/react"
import { useState } from "react"
import { api } from "../../convex/_generated/api"
import { motion } from "motion/react"
import { Loader, Plus } from "lucide-react"
import { useGetCookie } from "cookies-next"


export default function InputCard() {
    const [text, setText] = useState('')

    const addTask = useMutation(api.server.createTask)
    const getCookies = useGetCookie()

    const [Loading, setLoading] = useState(false)

    async function sendTask() {
        if (text.trim() === '') return
        setLoading(true)
        const token = getCookies('token')
        await addTask({text, token: token!})
        setLoading(false)
        setText('')
    }
    return(
        <div className="bg-gray-900 rounded-2xl w-fit mx-auto p-4 flex gap-2 mr-5 text-white">
            <input
             type="text" 
             placeholder="Task title"
             value={text}
             onChange={e => setText(e.target.value)}
             className="bg-gray-800 rounded-md p-2"
             />
            <motion.button 
                whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.8 }}
                onClick={sendTask}
                className="bg-blue-700 rounded-full p-2">
                {Loading ? <Loader className="animate-spin" /> : <Plus></Plus>}
            </motion.button>
        </div>
    )
}