import { db } from "../../db";
import { task } from "../../db/schema";

interface CreateTaskRequest {
	title: string;
	priority: string;
	deadline: string;
	status: string;
	comment: string;
	finished: boolean;
	createdAt: number;
	updatedAt: number;
}

export async function createTask({
	title,
	priority,
	deadline,
	status,
	comment,
	finished,
	createdAt,
	updatedAt,
}: CreateTaskRequest) {
	const [taskInsert] = await db
		.insert(task)
		.values({
			title,
			priority,
			deadline: new Date(deadline),
			status,
			comment,
			finished,
			createdAt: new Date(createdAt),
			updatedAt: new Date(updatedAt),
		})
		.returning();

	return { taskInsert };
}
