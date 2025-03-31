import fastify from "fastify";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const PrioritiesRouter: FastifyPluginAsyncZod = async (app) => {
	app.post("/refresh-token", async (req, res) => {
		try {
			const cookies = req.cookies || {};
			const token = cookies.token;

			if (!token) {
				return res.status(401).send({ message: "Token não encontrado" });
			}

			// Verifique o token atual
			const decoded = await req.jwtVerify();

			// Crie um novo token
			const newToken = fastify.jwt.sign({ username: decoded.username });

			// Atualize o cookie com o novo token
			res.setCookie("token", newToken, {
				path: "/",
				httpOnly: true,
				secure: true,
				sameSite: "none",
				maxAge: 3600 * 1000,
			});

			return res.send({ message: "Token renovado" });
		} catch (err) {
			return res.status(403).send({ message: "Token inválido" });
		}
	});
};
