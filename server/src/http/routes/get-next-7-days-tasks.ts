import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getNext7DaysTasks } from "../../app/function/get-next-7-days-tasks";

export const getNext7DaysTasksRouter: FastifyPluginAsyncZod = async (app) => {
	app.get("/next7days", async (req, res) => {
		const { filterTasks } = await getNext7DaysTasks();
		return filterTasks;
	});
};
