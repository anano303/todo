// TodoList.jsx
import React, { useCallback, useState } from "react";
import DoneList from "./DoneList";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const onChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const addTask = (event) => {
    event.preventDefault();

    const task = {
      id: tasks.length + 1,
      name: inputValue,
    };

    setTasks((prevState) => [...prevState, task]);
    setInputValue("");
  };

  const endTask = useCallback(
    (id) => {
      const taskToMove = tasks.find((task) => task.id === id);
      setDoneTasks((prevState) => [...prevState, taskToMove]);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    },
    [tasks]
  );

  const removeTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const returnToTodo = useCallback(
    (id) => {
      const taskToMove = doneTasks.find((task) => task.id === id);
      setTasks((prevTasks) => [...prevTasks, taskToMove]);
      setDoneTasks((prevDoneTasks) =>
        prevDoneTasks.filter((task) => task.id !== id)
      );
    },
    [doneTasks]
  );

  return (
    <div className="lists-container">
      <div className="todo">
        <h2>Todo List</h2>
        <form onSubmit={addTask} className="user-form">
          <input type="text" onChange={onChange} value={inputValue} />
          <button type="submit" className="btn-add">
            Add Task
          </button>
        </form>

        {tasks.map((task) => (
          <div key={task.id} className="task">
            <p>{task.name}</p>
            <div className="d-flex">
              <button onClick={() => endTask(task.id)}>End Task</button>
              <button onClick={() => removeTask(task.id)}>Remove Task</button>
            </div>
          </div>
        ))}
      </div>

      <DoneList doneTasks={doneTasks} returnToTodo={returnToTodo} />
    </div>
  );
};

export default TodoList;
