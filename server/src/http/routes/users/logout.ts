import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const LogoutRouter: FastifyPluginAsyncZod = async (app) => {
	app.post("/logout", async (req, res) => {
		res.clearCookie("token", {
			path: "/",
		});

		res.send({ message: "Logout successful", isAuthenticated: false });
	});
};
