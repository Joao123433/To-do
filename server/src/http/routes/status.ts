import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getAllStatus } from "../../app/function/get-all-status";

export const StatusRouter: FastifyPluginAsyncZod = async (app) => {
	app.get("/status", {}, async () => {
		const { allStatus } = await getAllStatus();

		return allStatus;
	});
};
