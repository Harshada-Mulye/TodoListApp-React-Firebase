import React from "react";

function AddToDo() {
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Enter a Todo..."
          className="task-input"
          required
        />
        <button className="button-add task-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddToDo;
