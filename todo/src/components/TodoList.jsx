import React from "react";

function TodoList({ todos, onEdit, onDelete, onToggle }) {
  return (
    <div className="wrapper">
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <div className="line">
        <li key={index} className={`todo-item ${todo.completed ? "completed" : ""}`}>
          <span className="spanBtns">
          <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={() => onToggle(index)} 
          />
          <span className={todo.completed ? "completed-text" : ""} onClick={() => onToggle(index)}>
            {todo.text}
          </span>
          <button className="btns" onClick={() => onEdit(index)}>
            <img src="/images/edit.png" alt="Edit" />
          </button>
          <button className="btns" onClick={() => onDelete(index)}>
            <img src="/images/delete.png" alt="delete" />
          </button>
          </span>
        </li>
        </div>
      ))}
    </ul>
    </div>
  );
}

export default TodoList;
