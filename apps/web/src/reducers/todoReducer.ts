export interface TodoFilterState {
  searchQuery: string;
  selectedGroup: string;
  sortBy: "deadline" | "title";
}

export type TodoAction =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_GROUP"; payload: string }
  | { type: "SET_SORT"; payload: "deadline" | "title" }
  | { type: "RESET_FILTERS" };

export const initialFilterState: TodoFilterState = {
  searchQuery: "",
  selectedGroup: "All",
  sortBy: "deadline",
};

export function todoReducer(state: TodoFilterState, action: TodoAction): TodoFilterState {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "SET_GROUP":
      return { ...state, selectedGroup: action.payload };
    case "SET_SORT":
      return { ...state, sortBy: action.payload };
    case "RESET_FILTERS":
      return initialFilterState;
    default:
      return state;
  }
}
