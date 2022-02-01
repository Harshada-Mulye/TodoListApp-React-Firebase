import React from 'react'
import { useState } from 'react'
import { editTask } from '../backend/api.jsx'

const Modal = (props) => {
  const [newTask, setNewTask] = useState('')

  const updateTask = (id, taskName) => {
    editTask(id, taskName)
    props.closeAction()
  }

  return (
    <div>
      <input
        name="task"
        type="text"
        placeholder={props.name}
        className="task-input"
        required
        onChange={(event) => {
          setNewTask(event.target.value)
        }}
      />
      <button
        className="update"
        type="submit"
        onClick={() => {
          updateTask(props.id, newTask)
        }}
      >
        Update
      </button>
    </div>
  )
}

export default Modal
