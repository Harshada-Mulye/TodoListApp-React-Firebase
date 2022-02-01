import React from "react";
import { useState } from "react";
import { db } from "../backend/firebase-config";
import { doc, updateDoc } from "firebase/firestore";

const Modal = (props) => {
  const [newTask, setNewTask] = useState("");
  const editTask = async (id, taskName) => {
    const taskDoc = doc(db, "todolist", id);
    const newFields = { taskName: newTask };
    if(newTask!=""){
       await updateDoc(taskDoc, newFields);
    }
   else{
     alert("Please enter updated task!")
   }
  props.closeAction();
  };

  return (
    <div>
      <input
        name="task"
        type="text"
       
        placeholder={props.name}
        className="task-input"
        required
        onChange={(event) => {
          setNewTask(event.target.value);
        }}
      />
      <button
        className="update" 

        type="submit"
        onClick={() => {
          editTask(props.id, newTask);
        }}
      >
        Update
      </button>
    </div>
  );
};

export default Modal;
