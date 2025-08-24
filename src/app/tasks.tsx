import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import Task from "./task"

export default function Tasks() {
    const tasks = useQuery(api.server.getTasks)

    if (!tasks) return <div>Loading tasks...</div>

    return (
        <div className=" w-fit mx-auto p-4 gap-2 flex flex-col">
            {tasks.map(task => (
                <Task task={task} key={task._id}/>
            ))}
        </div>
    )
}