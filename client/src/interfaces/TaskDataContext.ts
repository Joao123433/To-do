import type { TaskFetch } from "../interfaces/TaskFetch";
import type { PrioritiesFetch } from "./PriotiritesFetch";
import type { StatusFetch } from "./StatusFetch";
import type { TaskOmit } from "./TaskOmit";

export interface TaskDataContext {
	tasks: TaskFetch[];
	status: StatusFetch[];
	priorities: PrioritiesFetch[];
	filterStatus: (id: string) => string;
	filterPriority: (id: string) => string;
	formatDate: (date: Date) => string;
	newTaskModal: boolean;
	isOpenNewTask: () => void;
	onRequestCloseNewTask: () => void;
	// createTask: (task: TaskOmit) => Promise<void>;
	// updateTask: (task: TaskFetch) => Promise<void>;
	// deleteTask: (id: string) => Promise<void>;
}
