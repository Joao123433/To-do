import { asc, sql } from "drizzle-orm";
import { db } from "../../db";
import { task } from "../../db/schema";
import dayjs from "dayjs";

export async function getAllTask() {
	// const today = dayjs().startOf("day").format("YYYY-MM-DD");

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
		// .where(sql`DATE(${task.deadline}) >= ${today}`)
		.orderBy(asc(task.deadline));

	return { allTask };
}
