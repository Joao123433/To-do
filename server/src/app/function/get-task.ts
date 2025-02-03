import { eq } from "drizzle-orm";
import { db } from "../../db";
import { task } from "../../db/schema";

export async function getTask(idTask: string) {
	const taskFetch = await db
		.select({
			id: task.id,
			title: task.title,
			priority: task.priority,
			deadline: task.deadline,
			status: task.status,
			comment: task.comment,
			finished: task.finished,
		})
		.from(task)
		.where(eq(task.id, idTask));

	return { taskFetch };
}
