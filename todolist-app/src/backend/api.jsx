import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from './firebase-config'

function getTask(id) {
  return doc(db, 'todolist', id)
}
const deleteTask = async (id) => {
  const taskDoc = getTask(id)
  await deleteDoc(taskDoc)
}

const toggleStatus = async (id, isCompleted) => {
  const taskDoc = getTask(id)
  const newFields = { isCompleted: !isCompleted }
  await updateDoc(taskDoc, newFields)
}

const editTask = async (id, taskName, closeAction) => {
  const taskDoc = getTask(id)
  const newFields = { taskName: taskName }
  if (taskName !== '') {
    await updateDoc(taskDoc, newFields)
  } else {
    alert('Please enter updated task!')
  }
}

export { deleteTask, toggleStatus, editTask }
