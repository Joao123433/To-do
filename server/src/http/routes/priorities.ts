import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getAllPriorities } from "../../app/function/get-all-priorities";

export const PrioritiesRouter: FastifyPluginAsyncZod = async (app) => {
	app.get("/priorities", {}, async () => {
		const { allPriorities } = await getAllPriorities();

		return allPriorities;
	});
};
