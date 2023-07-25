import tasks from "./Tasks.module.css";

const TaskDetails = ({selectedTask}) => {
    return (
        <section className={`${tasks.details} blk-shadow`}>
            {selectedTask}
        </section>
    );
}

export default TaskDetails;