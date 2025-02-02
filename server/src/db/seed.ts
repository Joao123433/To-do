import { client, db } from "../db";
import { priority, status, task } from "./schema/index";
import dayjs from "dayjs";

async function seed() {
	await db.delete(task);
	await db.delete(priority);
	await db.delete(status);

	const [done, inProgress, toDo] = await db
		.insert(status)
		.values([{ title: "Done" }, { title: "In Progress" }, { title: "To-Do" }])
		.returning();

	const [low, medium, high] = await db
		.insert(priority)
		.values([{ title: "Low" }, { title: "Medium" }, { title: "High" }])
		.returning();

	const currentDay = dayjs();

	await db.insert(task).values([
		{
			title: "First Task",
			priority: high.id,
			deadline: currentDay.toDate(),
			status: inProgress.id,
			comment: "lorem lorem lorem lorem",
			finished: false,
			createdAt: currentDay.toDate(),
			updatedAt: currentDay.toDate(),
		},
	]);
}

seed().then(() => {
	console.log("Seed Generate");
	client.end();
});
