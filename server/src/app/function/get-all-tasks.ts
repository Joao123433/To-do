import { toPascal } from "postgres";
import { db } from "../../db";
import { task } from "../../db/schema";

export async function getAllTask() {
	const allTask = await db
		.select({
			id: task.id,
			title: task.title,
			priority: task.priority,
			deadline: task.deadline,
			status: task.status,
			comment: task.comment,
			finished: task.finished,
			row: task.row,
			createdAt: task.createdAt,
			updatedAt: task.updatedAt,
		})
		.from(task);

	return { allTask };
}
