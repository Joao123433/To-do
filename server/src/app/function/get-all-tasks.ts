import { asc, gte } from "drizzle-orm";
import { db } from "../../db";
import { task } from "../../db/schema";
import dayjs from "dayjs";

export async function getAllTask() {
	const today = dayjs().startOf("day").toDate();

	console.log(today);

	const allTask = await db
		.select({
			id: task.id,
			title: task.title,
			priority: task.priority,
			deadline: task.deadline,
			status: task.status,
			comment: task.comment,
			row: task.row,
			createdAt: task.createdAt,
			updatedAt: task.updatedAt,
		})
		.from(task)
		.where(gte(task.deadline, today))
		.orderBy(asc(task.deadline));

	return { allTask };
}
