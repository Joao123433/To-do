import "@fastify/jwt";

declare module "fastify" {
	interface FastifyInstance {
		jwt: typeof import("@fastify/jwt");
	}

	interface FastifyRequest {
		user?: Record<string>;
	}
}
