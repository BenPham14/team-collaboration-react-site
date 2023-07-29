import { useEffect, useState } from "react";
import tasks from "./Tasks.module.css";

const TaskDetails = ({selectedTask, editTask}) => {
    const [newTask, setNewTask] = useState("");


    useEffect(() => {
        setNewTask(selectedTask.label)
    }, [selectedTask.label])

    const handleSubmit = () => {
        editTask(newTask, selectedTask.id);
    }

    return (
        <section className={`${tasks.details} blk-shadow flex column`}>
            {
                selectedTask.date &&
                <h5>{selectedTask.date}</h5>
            }
            <input 
                type="text"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
            />
            <button onClick={() => handleSubmit()}>Save</button>
        </section>
    );
}

export default TaskDetails;