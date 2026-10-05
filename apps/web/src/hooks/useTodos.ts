import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useReducer } from "react";
import { initialFilterState, todoReducer } from "../reducers/todoReducer";
import { addTaskApi, deleteTaskApi, fetchTasks, updateTaskStatusApi } from "../services/api";
import type { Task } from "../services/mockData";

export function useTodos() {
  const queryClient = useQueryClient();
  const [filterState, dispatchFilter] = useReducer(todoReducer, initialFilterState);

  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Task[]>({
    queryKey: ["todos"],
    queryFn: fetchTasks,
  });

  const addTaskMutation = useMutation({
    mutationFn: addTaskApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateTaskStatusApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: Task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
        task.details.toLowerCase().includes(filterState.searchQuery.toLowerCase());
      const matchesGroup =
        filterState.selectedGroup === "All" || task.group === filterState.selectedGroup;
      return matchesSearch && matchesGroup;
    });
  }, [tasks, filterState]);

  const tasksByGroup = useMemo(() => {
    const map: Record<string, Task[]> = {};

    tasks.forEach((t: Task) => {
      if (!map[t.group]) {
        map[t.group] = [];
      }
      const currentGroup = map[t.group] || [];
      currentGroup.push(t);
    });

    return map;
  }, [tasks]);

  const customGroups = useMemo(() => {
    return Array.from(new Set(tasks.map((t: Task) => t.group)));
  }, [tasks]);

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    isLoading,
    isError,
    error,
    refetch,
    filterState,
    dispatchFilter,
    tasksByGroup,
    customGroups,
    addTask: addTaskMutation.mutateAsync,
    updateStatus: updateStatusMutation.mutateAsync,
    deleteTask: deleteTaskMutation.mutateAsync,
  };
}
