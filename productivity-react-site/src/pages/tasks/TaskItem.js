import tasks from "./Tasks.module.css";

const TaskItem = ({id, label, deleteTask, setSelectedTask}) => {
    return (
        <>
            <div className={`${tasks.item} flex gry-hover`} onClick={() => setSelectedTask(label)}>
                <input type="checkbox" id={id} onClick={() => deleteTask(id)}></input>
                <p>{label}</p>
            </div>
        </>
    );
}

export default TaskItem;