import { useState, useEffect } from "react";
import { db } from "./backend/firebase-config";
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import TaskList from "./components/TaskList";
import "./styles/style.css";
import AddToDo from "./components/AddToDo";

function App() {
  const [tasks, setTasks] = useState([]);
  const tasksCollectionRef = collection(db, "todolist");
  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data);
    };
    getTasks();
    const unSub = onSnapshot(tasksCollectionRef, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unSub();
  }, []);
  let countDone = tasks.reduce(function (count, item) {
    return count + (item["isCompleted"] === true ? 1 : 0);
  }, 0);
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
  );
}

export default App;
