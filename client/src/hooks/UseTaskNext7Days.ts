import { UseTask } from "./UseTask";
import dayjs from "dayjs";

export function UseTaskNext7Days() {
	const { tasks } = UseTask();

	const taskNext7Days = tasks.filter((task) => {
		const today = dayjs().startOf("day");
		const nextWeek = dayjs().add(7, "day").startOf("day");

		const taskDeadline = dayjs(task.deadline).startOf("day");

		return (
			(taskDeadline.isSame(today, "day") ||
				taskDeadline.isAfter(today, "day")) &&
			taskDeadline.isBefore(nextWeek, "day")
		);
	});

	return { taskNext7Days };
}
