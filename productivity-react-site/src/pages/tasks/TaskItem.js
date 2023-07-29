import tasks from "./Tasks.module.css";

const TaskItem = ({task, deleteTask, setSelectedTask, setIsShowing}) => {
    return (
        <>
            <button className={`${tasks.item} flex gry-hover`}>
                <input type="checkbox" id={task.id} onClick={() => deleteTask(task.id)}></input>
                <div className="flex" onClick={() => {setSelectedTask(task); setIsShowing(true)}}>
                    <p>{task.label}</p>
                    <p>{task.date}</p>
                </div>
            </button>
        </>
    );
}

export default TaskItem;