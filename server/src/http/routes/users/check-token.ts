import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const CheckToukenRouter: FastifyPluginAsyncZod = async (app) => {
	app.get("/check-token", async (req, res) => {
		try {
			const token = req.cookies.token;

			if (!token) {
				return res.status(200).send({ message: "Token não encontrado" });
			}

			await app.jwt.verify(token);

			return res.status(200).send({ message: "Token válido" });
		} catch (err) {
			console.error("Erro ao verificar token:", err);
		}
	});
};
