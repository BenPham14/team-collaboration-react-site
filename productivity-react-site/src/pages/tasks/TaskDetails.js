import { useContext, useEffect, useState } from "react";
import tasks from "./Tasks.module.css";
import { AppContext } from "../../context/AppContext";
import { RiArrowLeftLine } from "react-icons/ri";

const TaskDetails = ({selectedTask, setSelectedTask, editTask, isShowing, setIsShowing}) => {
    const [newTask, setNewTask] = useState("");
    const [newDate, setNewDate] = useState("");
    const [button, setButton] = useState(false);
    const { screenWidth, currentTeam } = useContext(AppContext);

    useEffect(() => {
        setNewTask(selectedTask.label);
        setNewDate(selectedTask.date);
        setButton(false);
    }, [selectedTask.label]);

    useEffect(() => {
        setSelectedTask({});
    },[currentTeam]);

    const handleSubmit = () => {
        editTask(newTask, newDate, selectedTask.id);
        setButton(false);
    };

    if (selectedTask.label == null) {
        return <section className={`${tasks.details} flex column`}></section>
    };

    return (
        <section 
            className={`${tasks.details} flex column`} 
            style={{display: (screenWidth < 768) & (isShowing == false) ? "none" : "flex"}}
        >
            <div className={`${tasks.header} flex`}>
                <div className={`${tasks.left} flex`}>
                    {
                        screenWidth < 768 &&
                            <RiArrowLeftLine onClick={() => setIsShowing(false)}/>
                    }
                    <input 
                        type="date" 
                        value={newDate} 
                        onChange={(event) => {setNewDate(event.target.value); setButton(true)}}
                    />
                </div>
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
};

export default TaskDetails;