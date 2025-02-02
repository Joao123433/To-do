import { db } from "../../db";
import { priority } from "../../db/schema";

export async function getAllPriorities() {
	const allPriorities = await db
		.select({
			id: priority.id,
			title: priority.title,
		})
		.from(priority);

	return { allPriorities };
}
