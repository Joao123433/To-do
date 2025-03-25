import { and, asc, eq, gte } from "drizzle-orm";
import { db } from "../../db";
import { priority, task } from "../../db/schema";
import dayjs from "dayjs";

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
	const today = dayjs().startOf("day").toDate();

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
		.where(and(eq(task.priority, idHighPriority), gte(task.deadline, today)))
		.orderBy(asc(task.deadline));

	return { taksHighPriority };
}
