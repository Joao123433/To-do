import { desc, eq } from "drizzle-orm";
import { db } from "../../db";
import { status, task } from "../../db/schema";

async function generateNextRow(idStatus: string): Promise<string> {
	const statusColumn = await db
		.select({
			column: status.column,
		})
		.from(status)
		.where(eq(status.id, idStatus));

	const lastTask = await db
		.select()
		.from(task)
		.where(eq(task.status, idStatus))
		.orderBy(desc(task.row));

	if (!lastTask || lastTask.length === 0) {
		return `${statusColumn[0].column}1`;
	}

	const lastRowValue = lastTask[0].row;
	const rowPrefix = lastRowValue.slice(0, 1);
	const lastNumber = Number(lastRowValue.slice(1));

	const nextNumber = lastNumber + 1;

	return `${rowPrefix}${nextNumber}`;
}

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
	const row = await generateNextRow(status);

	const [taskInsert] = await db
		.insert(task)
		.values({
			title,
			priority,
			deadline: new Date(deadline),
			status,
			comment,
			finished,
			row,
			createdAt: new Date(createdAt),
			updatedAt: new Date(updatedAt),
		})
		.returning();

	return { taskInsert };
}
