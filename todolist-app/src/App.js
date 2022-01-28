import { useState, useEffect } from "react";
import { db } from "./backend/firebase-config";
import { collection, getDocs, doc } from "firebase/firestore";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const tasksCollectionRef = collection(db, "todolist");
  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTasks();
  }, []);
  return (
    <div className="App">
      {tasks.map((task) => {
        return <div>{task.taskName}</div>;
      })}
    </div>
  );
}

export default App;
