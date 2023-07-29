import { useEffect, useState } from "react";
import tasks from "./Tasks.module.css";

const TaskDetails = ({selectedTask, editTask}) => {
    const [newTask, setNewTask] = useState("");
    const [newDate, setNewDate] = useState("");
    const [button, setButton] = useState(false);

    useEffect(() => {
        setNewTask(selectedTask.label);
        setNewDate(selectedTask.date);
        setButton(false)
    }, [selectedTask.label])

    const handleSubmit = () => {
        editTask(newTask, newDate, selectedTask.id);
        setButton(false);
    }

    if (selectedTask.label == null) {
        return <section className={`${tasks.details} blk-shadow flex column`}></section>
    }

    return (
        <section className={`${tasks.details} blk-shadow flex column`}>
            <div className={`${tasks.header} flex`}>
                <input 
                    type="date" 
                    value={newDate} 
                    onChange={(event) => {setNewDate(event.target.value); setButton(true)}}
                />
                {   
                    button &&
                        <button onClick={() => handleSubmit()}>Save</button>
                }
            </div>
            <textarea
                type="text"
                value={newTask}
                onChange={(event) => {setNewTask(event.target.value); setButton(true)}}
            />
        </section>
    );
}

export default TaskDetails;