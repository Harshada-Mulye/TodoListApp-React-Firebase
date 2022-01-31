import React from "react";
import { useState } from "react";
import { db } from "../backend/firebase-config";
import { collection, addDoc } from "firebase/firestore";


function AddToDo() {
	const [newTask, setNewTask] = useState("");
	const tasksCollectionRef = collection(db, "todolist");

	const createTask = async (e) => {
		console.log("added");
		e.preventDefault();
		await addDoc(tasksCollectionRef, { taskName: newTask, isCompleted: false });
		setNewTask("")
	  };
  return (
    <div >
      <form className="addToDo" onSubmit={createTask}>
        <input
		 name="task"
          type="text"
          placeholder="Enter a Todo..."
          className="task-input"
          required
		  onChange={(event) => {
			setNewTask(event.target.value)
		
		}}
        />
        <button className="button-add task-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddToDo;
