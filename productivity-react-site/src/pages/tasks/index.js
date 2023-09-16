import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import tasks from "./Tasks.module.css";
import TaskItem from "./TaskItem";
import TaskDetails from "./TaskDetails";
import { query, collection, where, orderBy, onSnapshot, addDoc, doc, deleteDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import {v4 as uuidv4} from 'uuid';
import { AppContext } from "../../context/AppContext";

const Tasks = ({setIsAuth}) => {
    const [newItem, setNewItem] = useState("");
    const [newDate, setNewDate] = useState("");
    const [tasksList, setTaskList] = useState([]);
    const [selectedTask, setSelectedTask] = useState({});
    const [isShowing, setIsShowing] = useState(false);
    const tasksRef = collection(db, "tasks");
    const { currentTeamUID } = useContext(AppContext);

    useEffect(() => {
        const queryTasks = query(
            tasksRef,
            where("teamUID", "==", currentTeamUID),
            orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(queryTasks, (snapshot) => {
            let tasks = [];
            snapshot.forEach((doc) => {
                tasks.push({...doc.data(), id: doc.id});
            });
            setTaskList(tasks);
        });

        return () => unsubscribe();
    }, [currentTeamUID]);

    const addTask = async (text, date) => {
        if (text === "") {
            return
        };
        await addDoc(tasksRef, {
            uid: uuidv4(),
            label: text,
            date: date,
            assignedTo: "",
            teamUID: currentTeamUID,
            createdAt: serverTimestamp(),
            createdBy: auth.currentUser.displayName,
            createdByUID: auth.currentUser.uid
        });
        setNewItem("");
        setNewDate("");
    };

    const deleteTask = (taskDoc) => {
        const taskRef = doc(db, "tasks", taskDoc);
        setTimeout(async () => {
            await deleteDoc(taskRef);
        }, 200);
    };

    const editTask = async (label, date, taskDoc) => {
        const taskRef = doc(db, "tasks", taskDoc);
        await updateDoc(taskRef, {
            label: label,
            date: date
        });
    };

    const handleEnter = (event) => {
        if(event.key === 'Enter') { 
            addTask(newItem, newDate);
            event.preventDefault();
        };
    };

    return (
        <>
            <Sidebar />
            <main className={tasks.tasks}>
                <Topbar setIsAuth={setIsAuth}/>
                <div className={`${tasks.sections} grid`}>
                    <section className={`${tasks.list} flex column`}>
                        <form className={`grid`} onKeyDown={handleEnter}>
                            <input 
                                type="text" 
                                value={newItem} 
                                placeholder="+ Press Enter to add task" 
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
                                    setIsShowing={setIsShowing}
                                />
                            ))
                        }
                    </section>
                    <TaskDetails 
                        selectedTask={selectedTask}
                        setSelectedTask={setSelectedTask}
                        editTask={editTask}
                        isShowing={isShowing}
                        setIsShowing={setIsShowing}
                    />
                </div>
            </main>
        </>
    );
};

export default Tasks;