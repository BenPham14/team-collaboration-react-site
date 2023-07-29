import { useEffect, useState } from "react";
import tasks from "./Tasks.module.css";

const TaskDetails = ({selectedTask, editTask}) => {
    const [newTask, setNewTask] = useState("");
    const [button, setButton] = useState(false);

    useEffect(() => {
        setNewTask(selectedTask.label);
        setButton(false)
    }, [selectedTask.label])

    const handleSubmit = () => {
        editTask(newTask, selectedTask.id);
        setButton(false);
    }

    return (
        <section className={`${tasks.details} blk-shadow flex column`}>
            <div className={`${tasks.header} flex`}>
                <h5>{selectedTask.date}</h5>
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