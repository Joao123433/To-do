import dayjs from "dayjs";
import { db } from "../../db";
import { task } from "../../db/schema";
import { between } from "drizzle-orm";

export async function getNext7DaysTasks() {
	const currentDate = dayjs().startOf("day").toDate();
	const OneWeekLater = dayjs().add(7, "day").startOf("day").toDate();

	const filterTasks = db
		.select({
			id: task.id,
			title: task.title,
			priority: task.priority,
			deadline: task.deadline,
			status: task.status,
			comment: task.comment,
		})
		.from(task)
		.where(between(task.deadline, currentDate, OneWeekLater));

	return { filterTasks };
}
