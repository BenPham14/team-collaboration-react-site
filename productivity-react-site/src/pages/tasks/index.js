import { useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import tasks from "./Tasks.module.css";
import TaskItem from "./TaskItem";
import TaskDetails from "./TaskDetails";

const Tasks = () => {
    const [newItem, setNewItem] = useState("");
    const [tasksList, setTaskList] = useState([]);

    const addTask = (text) => {
        if (!text) {
            return
        };

        let item = {
            id: Math.floor(Math.random() * 1000),
            label: text
        };
        setTaskList([...tasksList, item]);
        setNewItem("");
    }

    const deleteTask = (item) => {
        let list = tasksList.filter((task) => task.id != item);
        setTimeout(() => {
            setTaskList(list);
        }, 200);
    }

    const handleEnter = (event) => {
        if(event.key === 'Enter') { 
            addTask(newItem)
        };
    }

    return (
        <>
            <Sidebar />
            <main className={tasks.tasks}>
                <Topbar />
                <div className={`${tasks.sections} grid`}>
                    <section className={`${tasks.list} flex column blk-shadow`}>
                        <input 
                            type="text" 
                            value={newItem} 
                            placeholder="+ Press Enter to add task..." 
                            onChange={(event) => setNewItem(event.target.value)}
                            onKeyDown={handleEnter}
                        />
                        {
                            tasksList.map((task) => (
                                <TaskItem 
                                    key={task.id}
                                    id={task.id}
                                    label={task.label}
                                    deleteTask={deleteTask}
                                />
                            ))
                        }
                    </section>
                    <TaskDetails />
                </div>
            </main>
        </>
    );
}

export default Tasks;