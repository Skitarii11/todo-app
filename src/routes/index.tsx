import { createFileRoute, Link } from '@tanstack/react-router';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useTodos } from '../hooks/useTodos';

export const Route = createFileRoute('/')({
  component: TodoPage,
});

function TodoList() {
  const { todos, stats, filterState, dispatch, addTodo, toggleTodo, deleteTodo, isAdding } =
    useTodos();
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      await addTodo(newTitle.trim());
      setNewTitle('');
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleTodo(id);
    } catch (err) {
      console.error('Failed to toggle todo:', err);
    }
  };

  return (
    <div>
      <h1>Todo Dashboard</h1>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
        <span>Total: {stats.total}</span>
        <span>Active: {stats.active}</span>
        <span>Completed: {stats.completed}</span>
      </div>

      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <input
          placeholder="Search todos..."
          value={filterState.searchQuery}
          onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
        />
        <select
          value={filterState.status}
          onChange={(e) =>
            dispatch({ type: 'SET_STATUS', payload: e.target.value as typeof filterState.status })
          }
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <form onSubmit={handleAdd} style={{ marginBottom: '20px' }}>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New todo title..."
          disabled={isAdding}
        />
        <button type="submit" disabled={isAdding}>
          {isAdding ? 'Adding...' : 'Add Todo'}
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <Link
              to="/todos/$id"
              params={{ id: todo.id }}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.title}
            </Link>
            <button type="button" onClick={() => handleDelete(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TodoPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading Todos...</div>}>
        <TodoList />
      </Suspense>
    </ErrorBoundary>
  );
}