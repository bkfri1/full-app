import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import Task from "./task"
import { useGetCookie } from "cookies-next"

export default function Tasks() {
    const getCookie = useGetCookie()

    const token = getCookie('token')

    const tasks = useQuery(api.server.getTasks, {token: token!})
    if (!tasks) return <div>Loading tasks...</div>

    return (
        <div className=" w-fit mx-auto p-4 gap-2 flex flex-col">
            {tasks.map(task => (
                <Task task={task} key={task._id}/>
            ))}
        </div>
    )
}