import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../../../db";
import { task } from "../../../db/schema";
import { asc, sql } from "drizzle-orm";
import dayjs from "dayjs";

export const ArchivedTasksrouter: FastifyPluginAsyncZod = async (app) => {
	app.get("/archived", async (req, res) => {
		try {
			const today = dayjs().startOf("day").format("YYYY-MM-DD");

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
				.where(sql`DATE(${task.deadline}) < ${today}`)
				.orderBy(asc(task.deadline));

			if (!allTask || allTask.length === 0)
				throw new Error("No archived tasks found.");

			res.status(200).send({
				message: "Archived tasks retrieved successfully.",
				data: allTask,
			});
		} catch (error) {
			res.status(500).send({
				message:
					error instanceof Error
						? `Error retrieving archived tasks: ${error.message}`
						: "An unexpected error occurred while retrieving archived tasks.",
			});
		}
	});
};
