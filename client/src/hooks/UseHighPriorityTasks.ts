import { UseTask } from "./UseTask";
import dayjs from "dayjs";

export function UseHighPriorityTasks() {
	const { tasks, filterPriority } = UseTask();

	const taskHighPriority = tasks.filter((task) => {
		if (filterPriority(task.priority) !== "High") {
			return false;
		}

		const today = dayjs().startOf("day");
		const taskDeadline = dayjs(task.deadline).startOf("day");

		return (
			taskDeadline.isSame(today, "day") || taskDeadline.isAfter(today, "day")
		);
	});

	return { taskHighPriority };
}
