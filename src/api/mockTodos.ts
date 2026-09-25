export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

let todosDatabase: Todo[] = [
  { id: '1', title: 'Learn TanStack Router', completed: true, createdAt: new Date().toISOString() },
  { id: '2', title: 'Master TanStack Query', completed: false, createdAt: new Date().toISOString() },
  { id: '3', title: 'Build React Todo App', completed: false, createdAt: new Date().toISOString() },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const api = {
  getTodos: async (): Promise<Todo[]> => {
    await delay(600);
    return [...todosDatabase];
  },

  getTodoById: async (id: string): Promise<Todo> => {
    await delay(400);
    const todo = todosDatabase.find((t) => t.id === id);
    if (!todo) throw new Error(`Todo with ID ${id} not found`);
    return todo;
  },

  addTodo: async (title: string): Promise<Todo> => {
    await delay(500);
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    todosDatabase.push(newTodo);
    return newTodo;
  },

  toggleTodo: async (id: string): Promise<Todo> => {
    await delay(400);
    const todo = todosDatabase.find((t) => t.id === id);
    if (!todo) throw new Error('Todo not found');
    todo.completed = !todo.completed;
    return todo;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await delay(400);
    todosDatabase = todosDatabase.filter((t) => t.id !== id);
  },
};