import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { MotionMYButton } from "./task";
import { Loader, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";



interface Props {
    task: (typeof api.server.getTasks._returnType)[number]
}
export default function EditTask(props: Props) {
    const edit = useMutation(api.server.editTask);
    const [editText, setEditText] = useState(props.task.title);
    const [editing, setEditing] = useState(false);
    const [Loading1,] = useState(false);

    return(
        <Dialog open={editing} onOpenChange={setEditing}>
                <DialogTrigger asChild><MotionMYButton
                    whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.8 }} 
                    onClick={async() => {
                        // setLoading1(true) 
                        // await editTask({ taskId: props.task._id, text: prompt("Edit task title", props.task.title) || props.task.title })
                        // setLoading1(false)
                    }}
                    className="text-gray-500 bg-white dark:bg-gray-600 hover:bg-gray-200 hover:dark:bg-gray-400 hover:text-black dark:text-white transition-colors cursor-pointer">
                        {Loading1 ? <Loader className="animate-spin"/> : <Pencil/>}
                    </MotionMYButton></DialogTrigger>
                    <DialogContent>
                    <DialogHeader>
                    <DialogTitle>What would you like to change the task to?</DialogTitle>
                    <input
                    onChange={(e) => setEditText(e.target.value)}
                    value={editText}
                    />
                    <Button
                        onClick={() => {
                            edit({
                                taskId: props.task._id,
                                text: editText
                            })
                            setEditing(false)
                        }}
                    >Save Changes
                    </Button>
                    </DialogHeader>
                    </DialogContent>
                    </Dialog>
    )
}