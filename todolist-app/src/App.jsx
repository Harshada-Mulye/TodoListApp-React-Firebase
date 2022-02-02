import { useState, useEffect } from 'react'
import { db } from './backend/firebase-config'
import { collection, onSnapshot } from 'firebase/firestore'
import TaskList from './components/TaskList'
import './styles/style.css'
import AddToDo from './components/AddToDo'
import { getCollection } from './backend/api.js'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const tasksCollectionRef = collection(db, 'todolist')

    async function getTasks() {
      const items = await getCollection()
      setTasks(items)
    }
    getTasks()

    const unSub = onSnapshot(tasksCollectionRef, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

    return () => unSub()
  }, [])

  const countDone = tasks.reduce(
    (count, item) => count + (item['isCompleted'] ? 1 : 0),
    0
  )

  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="title">Todo List App</h1>
        {countDone} of {tasks.length} tasks
        <hr />
        <TaskList tasks={tasks} />
        <AddToDo />
      </div>
    </div>
  )
}

export default App
