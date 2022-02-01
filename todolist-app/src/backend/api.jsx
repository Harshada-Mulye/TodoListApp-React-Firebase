import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from './firebase-config'

function getTask(id) {
  return doc(db, 'todolist', id)
}
const deleteTask = async (id) => {
  const taskDoc = getTask(id)
  await deleteDoc(taskDoc)
}

export default deleteTask
