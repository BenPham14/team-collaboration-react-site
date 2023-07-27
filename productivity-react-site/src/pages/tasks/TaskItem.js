import tasks from "./Tasks.module.css";

const TaskItem = ({id, label, deleteTask, setSelectedTask}) => {
    return (
        <>
            <div className={`${tasks.item} flex gry-hover`} onClick={() => setSelectedTask(label)}>
                <input type="checkbox" id={id} onClick={() => deleteTask(id)}></input>
                <div className="flex">
                    <p>{label}</p>
                    <p>date</p>
                </div>
            </div>
        </>
    );
}

export default TaskItem;