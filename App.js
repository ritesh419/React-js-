import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== "") {
      const newTask = {
        name: task,
        content: content,
        important: false,
        completed: false,
      };

      setTasks([...tasks, newTask]);
      setTask("");
      setContent("");
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const results = tasks.filter((task) =>
      task.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleImportantChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].important = !updatedTasks[index].important;
    setTasks(updatedTasks);
  };

  const handleCompletedChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Enter task content"
          value={content}
          onChange={handleContentChange}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <div className="search-input">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ul className="task-list">
        {(searchTerm ? searchResults : tasks).map((task, index) => (
          <li key={index} className={task.completed ? "completed-task" : ""}>
            <input
              type="radio"
              name={`important-${index}`}
              checked={task.important}
              onChange={() => handleImportantChange(index)}
            />
            <input
              type="checkbox"
              name={`completed-${index}`}
              checked={task.completed}
              onChange={() => handleCompletedChange(index)}
            />
            <span
              className={`task-name${task.important ? " important-task" : ""}`}
            >
              {task.name}
            </span>
            {task.content && <p>{task.content}</p>}
            <button onClick={() => handleRemoveTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
