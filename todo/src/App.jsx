import React, { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [categories, setCategories] = useState(["General"]);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [todos, setTodos] = useState({ General: [] });
  const [editingIndex, setEditingIndex] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  function addCategory() {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setTodos({ ...todos, [newCategory]: [] });
      setNewCategory("");
    }
  }
  function addTodo(task) {
    setTodos({
      ...todos,
      [selectedCategory]: [...todos[selectedCategory], { text: task, completed: false }],
    });
  }

  function updateTodo(task) {
    setTodos({
      ...todos,
      [selectedCategory]: todos[selectedCategory].map((todo, index) =>
        index === editingIndex ? { ...todo, text: task } : todo
      ),
    });
    setEditingIndex(null);
  }

  function editTodo(index) {
    setEditingIndex(index);
  }

  function deleteTodo(index) {
    setTodos({
      ...todos,
      [selectedCategory]: todos[selectedCategory].filter((_, i) => i !== index),
    });
  }

  function toggleComplete(index) {
    setTodos({
      ...todos,
      [selectedCategory]: todos[selectedCategory].map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      ),
    });
  }

  return (
    <div className="app-container">
      <div className="todo-section">
        <h1 className="app-title">To-Do List ({selectedCategory})</h1>
        <div className="todo-box">
          {editingIndex === null ? (
            <TodoInput onSave={addTodo} />
          ) : (
            <TodoInput
              task={todos[selectedCategory][editingIndex]?.text}
              isEditing={true}
              onSave={updateTodo}
              onCancel={() => setEditingIndex(null)}
            />
          )}
                <div className="sidebar">
        <h2>Categories</h2>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={addCategory}>Add Category</button>
      </div>
          <TodoList
            todos={todos[selectedCategory] || []}
            onEdit={editTodo}
            onDelete={deleteTodo}
            onToggle={toggleComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;