import React, { useState } from 'react';
import TaskList from './TaskList';
import useFetch from './useFetch';

const Home = () => {
  const { error, isPending, data: tasks, setData } = useFetch('http://localhost:8000/tasks');
  const [filter, setFilter] = useState('all'); 
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete the task');
        }
        setData((prevTasks) => prevTasks.filter(task => task.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting task:', error.message);
      });
  };

  const handleToggleCompleted = (id, currentStatus) => {
    setData((prevTasks) =>
      prevTasks.map(task => (task.id === id ? { ...task, status: currentStatus === 'Completed' ? 'Pending' : 'Completed' } : task))
    );
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const onDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const newTasksOrder = [...tasks];
    const draggedTask = newTasksOrder[draggedIndex];
    newTasksOrder.splice(draggedIndex, 1);
    newTasksOrder.splice(e.target.dataset.index, 0, draggedTask);
    setData(newTasksOrder);
  };

  const filteredTasks = filter === 'all' ? tasks :
    filter === 'completed' ? tasks.filter(task => task.status === 'Completed') :
    filter === 'pending' ? tasks.filter(task => task.status === 'Pending') :
    [];

  return (
    <div className="home">
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('all')}>All</button>
        <button onClick={() => handleFilterChange('completed')}>Completed</button>
        <button onClick={() => handleFilterChange('pending')}>Pending</button>
      </div>
      {error && <div className="error-message">Error: {error}</div>}
      {isPending && <div className="loading-message">Loading...</div>}
      {filteredTasks === null ? (
        <p>Error fetching tasks.</p>
      ) : (
        filteredTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onDelete={handleDelete}
            onToggleCompleted={handleToggleCompleted}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
          />
        )
      )}
    </div>
  );
};

export default Home;
