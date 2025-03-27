import { UseTask } from "./UseTask";
import dayjs from "dayjs";

export function UseArchive() {
	const { tasks } = UseTask();

	const taskHArchive = tasks.filter((task) =>
		dayjs(task.deadline).isBefore(dayjs().startOf("day")),
	);

	return { taskHArchive };
}
