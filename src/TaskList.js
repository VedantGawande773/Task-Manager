import React from 'react';

const TaskList = ({ tasks, onDelete, onToggleCompleted, onDragStart, onDragOver, onDrop }) => {
  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleToggleCompleted = (id, currentStatus) => {
    onToggleCompleted(id, currentStatus);
  };

  return (
    <div onDragOver={onDragOver} onDrop={onDrop}>
      {tasks.map((task, index) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => onDragStart(e, index)}
        >
          <div className={`task-preview ${task.status === 'Completed' ? 'completed-task' : ''}`}>
            <h2>{task.title}</h2>
            <p>Date Added: {task.date}</p>
            <p>Status: {task.status}</p>
            <label htmlFor="">Mark as done</label>
            <input
              type="checkbox"
              checked={task.status === 'Completed'}
              onChange={() => handleToggleCompleted(task.id, task.status)}
            />
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
