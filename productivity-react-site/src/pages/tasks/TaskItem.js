import tasks from "./Tasks.module.css";

const TaskItem = ({task, deleteTask, setSelectedTask}) => {
    return (
        <>
            <button className={`${tasks.item} flex gry-hover`} onClick={() => setSelectedTask(task.label)}>
                <input type="checkbox" id={task.id} onClick={() => deleteTask(task.id)}></input>
                <div className="flex">
                    <p>{task.label}</p>
                    <p>{task.date}</p>
                </div>
            </button>
        </>
    );
}

export default TaskItem;