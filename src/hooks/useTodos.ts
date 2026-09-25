import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useMemo, useReducer } from 'react';
import { api, type Todo } from '../api/mockTodos';

export type FilterStatus = 'all' | 'completed' | 'active';

interface FilterState {
  status: FilterStatus;
  searchQuery: string;
}

type FilterAction =
  | { type: 'SET_STATUS'; payload: FilterStatus }
  | { type: 'SET_SEARCH'; payload: string };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
}

export function useTodos() {
  const queryClient = useQueryClient();

  const { data: todos } = useSuspenseQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: api.getTodos,
  });

  const [filterState, dispatch] = useReducer(filterReducer, {
    status: 'all',
    searchQuery: '',
  });

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesStatus =
        filterState.status === 'all'
          ? true
          : filterState.status === 'completed'
          ? todo.completed
          : !todo.completed;

      const matchesSearch = todo.title
        .toLowerCase()
        .includes(filterState.searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [todos, filterState.status, filterState.searchQuery]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  const addTodoMutation = useMutation({
    mutationFn: (title: string) => api.addTodo(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const toggleTodoMutation = useMutation({
    mutationFn: (id: string) => api.toggleTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id: string) => api.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return {
    todos: filteredTodos,
    stats,
    filterState,
    dispatch,
    addTodo: addTodoMutation.mutateAsync,
    toggleTodo: toggleTodoMutation.mutateAsync,
    deleteTodo: deleteTodoMutation.mutateAsync,
    isAdding: addTodoMutation.isPending,
    isDeleting: deleteTodoMutation.isPending,
  };
}