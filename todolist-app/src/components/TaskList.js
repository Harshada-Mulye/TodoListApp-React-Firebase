import { db } from "../backend/firebase-config";
import { deleteDoc,doc } from "firebase/firestore";
const TaskList = (props) => {
	const deleteTask = async (id) => {
		const taskDoc = doc(db, "todolist", id);
		await deleteDoc(taskDoc);
	  };
  console.log(props.tasks);return (
    <div>
      {props.tasks.map((task) => {
        return (
          <div className="list-item" key={task.id}>
            <div>{task.taskName}</div>
            <div>
              <button className="button-edit task-button">Edit</button>
            </div>
            <div>
              <button className="button-delete task-button"  onClick={() => {
                deleteTask(task.id);
              }}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default TaskList;
