import dayjs from "dayjs";
import { db } from "../../db";
import { task } from "../../db/schema";
import { and, asc, between, gte } from "drizzle-orm";

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
		.where(
			and(
				between(task.deadline, currentDate, OneWeekLater),
				gte(task.deadline, currentDate),
			),
		)
		.orderBy(asc(task.deadline));

	return { filterTasks };
}
