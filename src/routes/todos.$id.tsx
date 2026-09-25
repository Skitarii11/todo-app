import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { api } from '../api/mockTodos';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const Route = createFileRoute('/todos/$id')({
  component: TodoDetailWrapper,
});

function TodoDetail() {
  const { id } = Route.useParams();

  const { data: todo } = useSuspenseQuery({
    queryKey: ['todo', id],
    queryFn: () => api.getTodoById(id),
  });

  if (!todo) return <div>Todo not found.</div>;

  return (
    <div>
      <h2>Todo Details</h2>
      <p><strong>ID:</strong> {todo.id}</p>
      <p><strong>Title:</strong> {todo.title}</p>
      <p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Pending'}</p>
      <p><strong>Created At:</strong> {new Date(todo.createdAt).toLocaleString()}</p>
    </div>
  );
}

function TodoDetailWrapper() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading Todo Details...</div>}>
        <TodoDetail />
      </Suspense>
    </ErrorBoundary>
  );
}