import { useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import tasks from "./Tasks.module.css";
import TaskItem from "./TaskItem";
import TaskDetails from "./TaskDetails";

const Tasks = () => {
    const [newItem, setNewItem] = useState("");
    const [newDate, setNewDate] = useState("");
    const [tasksList, setTaskList] = useState([]);
    const [selectedTask, setSelectedTask] = useState("");

    const addTask = (text, date) => {
        if (!text) {
            return
        };
        let item = {
            id: Math.floor(Math.random() * 1000),
            label: text,
            date: date
        };
        setTaskList([...tasksList, item]);
        setNewItem("");
        setNewDate("");
    }

    const deleteTask = (item) => {
        let list = tasksList.filter((task) => task.id != item);
        setTimeout(() => {
            setTaskList(list);
        }, 200);
    }

    const handleEnter = (event) => {
        if(event.key === 'Enter') { 
            addTask(newItem, newDate);
            event.preventDefault();
        };
    }

    return (
        <>
            <Sidebar />
            <main className={tasks.tasks}>
                <Topbar />
                <div className={`${tasks.sections} grid`}>
                    <section className={`${tasks.list} flex column blk-shadow`}>
                        <form className={`grid`} onKeyDown={handleEnter}>
                            <input 
                                type="text" 
                                value={newItem} 
                                placeholder="+ Press Enter to add task..." 
                                onChange={(event) => setNewItem(event.target.value)}
                            />
                            <input 
                                type="date"
                                value={newDate}
                                onChange={(event) => setNewDate(event.target.value)}
                            />
                        </form>
                        {
                            tasksList.map((task) => (
                                <TaskItem 
                                    key={task.id}
                                    task={task}
                                    deleteTask={deleteTask}
                                    setSelectedTask={setSelectedTask}
                                />
                            ))
                        }
                    </section>
                    <TaskDetails 
                        selectedTask={selectedTask}
                    />
                </div>
            </main>
        </>
    );
}

export default Tasks;