import type { TaskFetch } from "../interfaces/TaskFetch";
import type { PrioritiesFetch } from "./PriotiritesFetch";
import type { StatusFetch } from "./StatusFetch";
import type { TaskOmit } from "./TaskOmit";

export interface TaskDataContext {
	task: TaskFetch[];
	status: StatusFetch[];
	priorities: PrioritiesFetch[];
	// createTask: (task: TaskOmit) => Promise<void>;
	// updateTask: (task: TaskFetch) => Promise<void>;
	// deleteTask: (id: string) => Promise<void>;
}
