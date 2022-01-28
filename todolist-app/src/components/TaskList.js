const TaskList = (props) => {
  return (
    <div key={props.id}>
      {props.tasks.map((task) => {
        return (
          <div className="list-item">
            <div>{task.taskName}</div>
            <div>
              <button className="button-edit task-button">
                Edit
              </button>
            </div>
            <div>
              <button className="button-delete task-button">
               Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default TaskList;
