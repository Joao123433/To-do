import type { FastifyReply, FastifyRequest } from "fastify";

export async function AuthMiddleware(req: FastifyRequest, res: FastifyReply) {
	if (req.url === "/login" || req.url === "/register") {
		return;
	}

	try {
		const token = req.cookies.token;

		console.log(token);
		console.log(req);

		if (token === undefined) {
			return res.status(401).send({ message: "Missing Token" });
		}

		const decoded = await req.jwtVerify();
		console.log(decoded);
		req.user = decoded;
	} catch (err) {
		res.status(403).send({ message: "Invalid or missing token" });
	}
}
