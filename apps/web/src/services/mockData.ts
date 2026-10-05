export interface Task {
  id: string;
  title: string;
  details: string;
  deadline: string;
  status: "To Do" | "In Progress" | "Completed";
  group: string;
  color?: string;
  timeSlot?: number;
}

const getTodayAtHour = (hour: number) => {
  const d = new Date();
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Call doctor for tests",
    details: "Ask for blood tests and GYM certificate.",
    deadline: getTodayAtHour(9),
    status: "To Do",
    group: "General",
    color: "bg-blue-100 text-blue-700",
    timeSlot: 9,
  },
  {
    id: "2",
    title: "Sprint Planning & Backlog",
    details: "Review Q4 goals and update Jira tasks.",
    deadline: getTodayAtHour(11),
    status: "In Progress",
    group: "Work",
    color: "bg-emerald-100 text-emerald-700",
    timeSlot: 11,
  },
  {
    id: "3",
    title: "Guitar Practice",
    details: "Practice fingerpicking patterns for 45 mins.",
    deadline: getTodayAtHour(14),
    status: "To Do",
    group: "Hobby",
    color: "bg-amber-100 text-amber-700",
    timeSlot: 14,
  },
  {
    id: "4",
    title: "Team Sync & Code Review",
    details: "Review PRs for frontend auth flow.",
    deadline: getTodayAtHour(16),
    status: "Completed",
    group: "Team 1",
    color: "bg-purple-100 text-purple-700",
    timeSlot: 16,
  },
];
