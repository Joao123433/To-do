import { db } from "../../db";
import { status } from "../../db/schema";

export async function getAllStatus() {
	const allStatus = await db
		.select({
			id: status.id,
			title: status.title,
		})
		.from(status);

	return { allStatus };
}
