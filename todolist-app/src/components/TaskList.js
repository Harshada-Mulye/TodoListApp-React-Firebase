import { db } from "../backend/firebase-config";
import { deleteDoc,doc,updateDoc } from "firebase/firestore";
const TaskList = (props) => {
	const deleteTask = async (id) => {
		const taskDoc = doc(db, "todolist", id);
		await deleteDoc(taskDoc);
	  };
	  const toggleStatus = async (id,isCompleted) => {
		const taskDoc = doc(db, "todolist", id);
		const newFields = {isCompleted:!isCompleted};
		await updateDoc(taskDoc,newFields);
	  };
  console.log(props.tasks);return (
    <div>
      {props.tasks.map((task) => {
        return (
          <div className="list-item" key={task.id}>
            <div><h1  onClick={() => {
                toggleStatus(task.id,task.isCompleted);
              }} className={task.isCompleted?"done":"undone"}>{task.taskName}</h1></div>
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
