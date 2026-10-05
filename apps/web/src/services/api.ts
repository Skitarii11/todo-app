import { initialTasks, type Task } from "./mockData";

let tasksStorage: Task[] = [...initialTasks];

export const fetchTasks = async (): Promise<Task[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return [...tasksStorage];
};

export const fetchTaskById = async (id: string): Promise<Task> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const found = tasksStorage.find((t) => t.id === id);
  if (!found) throw new Error("Task not found");
  return { ...found };
};

export const addTaskApi = async (newTask: Omit<Task, "id">): Promise<Task> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const created: Task = { ...newTask, id: Date.now().toString() };
  tasksStorage.push(created);
  return created;
};

export const updateTaskStatusApi = async ({
  id,
  status,
}: {
  id: string;
  status: Task["status"];
}): Promise<Task> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const task = tasksStorage.find((t) => t.id === id);
  if (!task) throw new Error("Task not found");
  task.status = status;
  return { ...task };
};

export const deleteTaskApi = async (id: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  tasksStorage = tasksStorage.filter((t) => t.id !== id);
  return id;
};

export const fetchWeather = async (city: string) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.apiKey}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather data");
  return res.json();
};
