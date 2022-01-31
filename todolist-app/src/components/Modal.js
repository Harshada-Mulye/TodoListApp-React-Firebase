import React from "react";
import { useState } from "react";
import { db } from "../backend/firebase-config";
import { doc, updateDoc } from "firebase/firestore";

const Modal = (props) => {
  const [newTask, setNewTask] = useState("");
  const editTask = async (id, taskName) => {
    const taskDoc = doc(db, "todolist", id);
    const newFields = { taskName: newTask };
    await updateDoc(taskDoc, newFields);
  };

  return (
    <div>
      <input
        name="task"
        type="text"
        placeholder="Enter a Todo..."
        className="task-input"
        required
        onChange={(event) => {
          setNewTask(event.target.value);
        }}
      />
      <button
        className="button-add task-button"
        type="submit"
        onClick={() => {
          editTask(props.id, newTask);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default Modal;