import { db } from "../../db";
import { status } from "../../db/schema";

export async function getAllStatus() {
	const allStatus = await db
		.select({
			id: status.id,
			title: status.title,
			column: status.column,
		})
		.from(status);

	return { allStatus };
}
