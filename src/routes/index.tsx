import { createFileRoute, Link } from '@tanstack/react-router';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { type FilterStatus, useTodos } from '../hooks/useTodos';

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

  return (
    <div className="bg-[#181f30] rounded-xl border border-slate-800/80 p-7 shadow-2xl">
      <h1 className="text-3xl font-bold text-white mb-5 tracking-tight">Todo Dashboard</h1>

      <div className="flex gap-3 mb-5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-800/80 text-slate-300">
          <span>👥</span>
          <span>Total: {stats.total}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-950/70 text-emerald-400 border border-emerald-800/30">
          <span>✓</span>
          <span>Active: {stats.active}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-950/70 text-blue-400 border border-blue-800/30">
          <span>☑</span>
          <span>Completed: {stats.completed}</span>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search todos..."
            value={filterState.searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
            className="w-full bg-[#111625] border border-slate-800 rounded-lg px-3.5 py-2 pr-9 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">🔍</span>
        </div>

        <div className="flex bg-[#111625] p-1 rounded-lg border border-slate-800">
          {(['all', 'active', 'completed'] as FilterStatus[]).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => dispatch({ type: 'SET_STATUS', payload: status })}
              className={`px-4 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                filterState.status === status
                  ? 'bg-slate-700/80 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleAdd} className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="New todo title..."
            disabled={isAdding}
            className="w-full bg-[#111625] border border-slate-800 rounded-lg px-3.5 py-2 pr-8 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 disabled:opacity-50 transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">+</span>
        </div>
        <button
          type="submit"
          disabled={isAdding}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isAdding ? 'Adding...' : 'Add Todo'}
        </button>
      </form>

      <div className="border border-slate-800 rounded-lg divide-y divide-slate-800 overflow-hidden bg-[#111625]">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-3.5 px-4 py-3 hover:bg-slate-900/50 transition-colors">
            <button
              type="button"
              onClick={() => toggleTodo(todo.id)}
              className="cursor-pointer focus:outline-none"
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs transition-colors ${
                  todo.completed
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-slate-600 hover:border-slate-400'
                }`}
              >
                {todo.completed && '✓'}
              </div>
            </button>

            <Link
              to="/todos/$id"
              params={{ id: todo.id }}
              className={`flex-1 text-sm transition-colors ${
                todo.completed ? 'line-through text-slate-500' : 'text-slate-100 hover:text-blue-400'
              }`}
            >
              {todo.title}
            </Link>

            <button
              type="button"
              onClick={() => deleteTodo(todo.id)}
              className="p-1.5 text-rose-400 bg-rose-950/30 hover:bg-rose-900/50 border border-rose-800/30 rounded-md transition-colors cursor-pointer"
              title="Delete todo"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TodoPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="text-slate-400 p-4">Loading Dashboard...</div>}>
        <TodoList />
      </Suspense>
    </ErrorBoundary>
  );
}