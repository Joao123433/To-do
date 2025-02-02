import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getAllTask } from "../../app/function/get-all-tasks";

export const getAllTaskRoute: FastifyPluginAsyncZod = async (app) => {
	app.get("/task", {}, async () => {
		const { allTask } = await getAllTask();

		return allTask;
	});
};
