import { useState, useEffect } from 'react';
import { todoService } from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await todoService.getAll();
      setTodos(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Could not connect to backend. Is the server running?');
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const newTodo = await todoService.create(input);
      setTodos([newTodo, ...todos]);
      setInput('');
    } catch (err) {
      console.error('Add task error:', err);
      setError('Failed to add task.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>TaskFlow</h1>
      </header>

      <div className="card">
        {/* Input Form */}
        <form onSubmit={handleAddTodo} className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input}>
            {isLoading ? 'Saving...' : 'Add'}
          </button>
        </form>

        {/* Error Banner */}
        {error && <div className="error-banner">{error}</div>}

        {/* The List */}
        <ul className="todo-list">
          {todos.length === 0 && !error ? (
            <li className="empty-state">No tasks found. Start your day!</li>
          ) : (
            todos.map((todo) => (
              <li key={todo._id} className="todo-item">
                <span className="todo-text">{todo.text}</span>
                <span className="todo-date">
                  {new Date(todo.createdAt).toLocaleTimeString()}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
