import { eq } from "drizzle-orm";
import { db } from "../../db";
import { task } from "../../db/schema";

export async function getTasksByStatus(idStatus: string) {
	const taskByStatus = await db
		.select()
		.from(task)
		.where(eq(task.status, idStatus));

	return { taskByStatus };
}
