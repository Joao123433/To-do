import { UseTask } from "./UseTask";

export function UseHighPriorityTasks() {
	const { tasks, filterPriority } = UseTask();

	const taskHighPriority = tasks.filter(
		(task) => filterPriority(task.priority) === "High",
	);

	return { taskHighPriority };
}
