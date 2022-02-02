import {
  deleteDoc,
  doc,
  updateDoc,
  collection,
  getDocs,
} from 'firebase/firestore'
import { db } from './firebase-config'

function getTask(id) {
  return doc(db, 'todolist', id)
}
const getTasks = async () => {
  let items = []
  const tasksCollectionRef = collection(db, 'todolist')
  const data = await getDocs(tasksCollectionRef)

  if (data.empty) {
    return items
  }
  items = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  return items
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

export { deleteTask, toggleStatus, editTask, getTasks }
