// DoneList.jsx
import React from "react";

const DoneList = ({ doneTasks, returnToTodo }) => {
  return (
    <div className="done">
      <h2>Done List</h2>
      {doneTasks.map((task) => (
        <div key={task.id} className="task">
          <p>ID: {task.id}</p>
          <p>{task.name}</p>
          <button onClick={() => returnToTodo(task.id)}>Return to Todo</button>
        </div>
      ))}
    </div>
  );
};

export default DoneList;
