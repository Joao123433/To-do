import { eq } from "drizzle-orm";
import { db } from "../../db";
import { task } from "../../db/schema";

export async function deleteTask(idTask: string) {
	const deleteTaskFetch = await db
		.delete(task)
		.where(eq(task.id, idTask))
		.returning();

	return {
		deleteTaskFetch,
	};
}
