import { useState } from 'react'
import { db } from '../backend/firebase-config'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import Modal from './Modal.js'

const TaskList = (props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [taskToUpdate, setTaskToUpdate] = useState()
  const [idToUpdate, setidToUpdate] = useState()

  const deleteTask = async (id) => {
    const taskDoc = getTask(id);
    await deleteDoc(taskDoc)
  }

  const toggleStatus = async (id, isCompleted) => {
    const taskDoc = getTask(id);
    const newFields = { isCompleted: !isCompleted }
    await updateDoc(taskDoc, newFields)
  }

  function openModal(id, name) {
    setIsOpen(true)
    setidToUpdate(id)
    setTaskToUpdate(name)
  }

  function getTask(id) {
   return doc(db,'todolist',id);
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
                onClick={() => 
                  openModal(task.id, task.taskName)
                }
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
