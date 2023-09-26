import { useState } from "react";
import axios from "axios";
import Button from "./Button";

interface Task {
    id: string;
    title: string;
}

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [errorMessage, setErrorMessage] = useState<null | string>("");

    const handleClick = async () => {
        try {
            const { data } = await axios.get(
                "https://jsonplaceholder.typicode.com/todos?_limit=10"
            );
    
            setTasks(data);
            setErrorMessage(null);
        } catch (error: any) {
            setErrorMessage(error?.message);
        }
    };

    return ( 
        <>
            <h1>Tasks from API</h1>
            <Button disabled={false} onClick={handleClick}>
                Get Tasks from API
            </Button>

            {tasks?.length > 0 && tasks.map(tasks => (<p key={tasks.id}>{tasks.title}</p>))}

            {errorMessage} 
        </>
    );
}
 
export default Tasks;