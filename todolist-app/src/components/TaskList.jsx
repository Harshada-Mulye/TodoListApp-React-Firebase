import { useState } from 'react'
import Modal from './Modal.jsx'
import { deleteTask, toggleStatus } from '../backend/api.js'

const TaskList = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [taskToUpdate, setTaskToUpdate] = useState()
  const [idToUpdate, setidToUpdate] = useState()

  function openModal(id, name) {
    setIsOpen(true)
    setidToUpdate(id)
    setTaskToUpdate(name)
  }

  const closeModal = () => setIsOpen(false)

  return (
    <div>
      {isOpen && (
        <Modal id={idToUpdate} name={taskToUpdate} closeAction={closeModal} />
      )}
      {props.tasks.map((task) => {
        return (
          <div className="list-item" key={task.id}>
            <div>
              <h1
                onClick={() => {
                  toggleStatus(task.id, task.isCompleted)
                }}
                className={task.isCompleted ? 'done' : 'undone'}
              >
                {task.taskName}
              </h1>
            </div>

            <div>
              <button
                className="button-edit task-button"
                onClick={() => openModal(task.id, task.taskName)}
              >
                Edit
              </button>
            </div>
            <div>
              <button
                className="button-delete task-button"
                onClick={() => {
                  deleteTask(task.id)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default TaskList
