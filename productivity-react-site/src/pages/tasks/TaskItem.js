import tasks from "./Tasks.module.css";

const TaskItem = ({id, label, deleteTask}) => {
    return (
        <>
            <div className={`${tasks.item} flex gry-hover`}>
                <input type="checkbox" id={id} onClick={() => deleteTask(id)}></input>
                <label htmlFor={id}>{label}</label>
            </div>
        </>
    );
}

export default TaskItem;