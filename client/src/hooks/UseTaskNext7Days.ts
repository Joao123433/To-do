import { UseTask } from "./UseTask";
import dayjs from "dayjs";

export function UseTaskNext7Days() {
	const { tasks } = UseTask();

	const taskNext7Days = tasks.filter((task) => {
		const today = dayjs().startOf("day");
		const nextWeek = dayjs().add(7, "day").endOf("day");

		const taskDeadline = dayjs(task.deadline);

		return taskDeadline.isSame(today, "day") || taskDeadline.isBefore(nextWeek);
	});

	return { taskNext7Days };
}
