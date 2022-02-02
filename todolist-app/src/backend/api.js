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
const getCollection = async () => {
  const tasksCollectionRef = collection(db, 'todolist')
  const data = await getDocs(tasksCollectionRef)

  if (data.empty) {
    return []
  }
  return data.map((doc) => ({ ...doc.data(), id: doc.id }))
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

const editTask = async (id, taskName) => {
  const taskDoc = getTask(id)
  const newFields = { taskName: taskName }
  await updateDoc(taskDoc, newFields)
}

export { deleteTask, toggleStatus, editTask, getCollection }
