import { eq } from "drizzle-orm";
import { db } from "../../db";
import { priority, task } from "../../db/schema";

async function fetchIdPriority(): Promise<string> {
	const highPriorityId = await db
		.select({
			id: priority.id,
		})
		.from(priority)
		.where(eq(priority.title, "High"));

	const id = highPriorityId[0].id;

	return id;
}

export async function getHighPriorityTasks() {
	const idHighPriority = await fetchIdPriority();

	const taksHighPriority = await db
		.select({
			id: task.id,
			title: task.title,
			priority: task.priority,
			deadline: task.deadline,
			status: task.status,
			comment: task.comment,
		})
		.from(task)
		.where(eq(task.priority, idHighPriority));

	return { taksHighPriority };
}
