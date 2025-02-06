import { eq } from "drizzle-orm";
import { db } from "../../db";
import { task } from "../../db/schema";

export async function getTasksByStatus(idStatus: string) {
	const taskByStatus = await db
		.select({
			id: task.id,
			title: task.title,
			priority: task.priority,
			deadline: task.deadline,
			status: task.status,
			comment: task.comment,
		})
		.from(task)
		.where(eq(task.status, idStatus));

	return { taskByStatus };
}
