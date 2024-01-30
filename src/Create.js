import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Pending'); 
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date(); 
    const formattedDate = currentDate.toLocaleDateString(); 

    const task = { title, date: formattedDate, status }; 

    fetch('http://localhost:8000/tasks/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    }).then(() => {
      history.push('/');
    });
  }

  return (
    <div className="create">
      <h2>Add a New Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Task title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <button>Add Task</button>
      </form>
    </div>
  );
}
 
export default Create;
