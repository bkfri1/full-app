import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion } from "motion/react";
import { formatDistanceToNow } from "date-fns";
import { Loader, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const MotionMYButton = motion(Button);

interface Props {
    task: (typeof api.server.getTasks._returnType)[number]
}

export default function Task(props: Props) {
    const updateTask = useMutation(api.server.toggleTaskCompletion);
    const deleteTask = useMutation(api.server.deleteTask);
    const [Loading, setLoading] = useState(false);
    const [Loading1, setLoading1] = useState(false);
    const editTask = useMutation(api.server.editTask);
    return(
        <div className="bg-gray-900 p-5 rounded-md flex gap-10 justify-between items-center">
            <div className="flex items-center gap-3">
                <motion.input 
                    whileTap={{ scale: 0.8 }}
                    type="checkbox" 
                    checked={props.task.isCompleted} 
                    onChange={() => updateTask({ taskId: props.task._id })}
                    className="mr-3"    
                    />
                <div className="flex flex-col gap-2">
                    <span className="text-2xl text-white">{props.task.title}</span>
                    <span className="text-gray-500 text-sm">
                    {formatDistanceToNow(new Date(props.task._creationTime), { addSuffix: true })}
                    
                    </span>
            </div>
                <motion.button></motion.button>
            </div>
            <div className="flex flex-col gap-2">
                <MotionMYButton 
                variant={"secondary"}
                whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.8 }} 
                onClick={async() => {
                    setLoading(true) 
                    await deleteTask({ taskId: props.task._id})
                    setLoading(false)}}
                className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
                    {Loading ? <Loader className="animate-spin"/> : <Trash/>}
                </MotionMYButton>
                <MotionMYButton
                whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.8 }} 
                onClick={async() => {
                    setLoading1(true) 
                    await editTask({ taskId: props.task._id, text: prompt("Edit task title", props.task.title) || props.task.title })
                    setLoading1(false)}}
                className="text-gray-500 hover:text-white transition-colors cursor-pointer">
                    {Loading1 ? <Loader className="animate-spin"/> : <Pencil/>}
                </MotionMYButton>
            </div> 
        </div>
    ) 
}   