import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import {
	type ZodTypeProvider,
	validatorCompiler,
	serializerCompiler,
} from "fastify-type-provider-zod";
import { getAllStatusRoute } from "./routes/get-all-status";
import { getAllPrioritiesRouter } from "./routes/get-all-priorities";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, { origin: "*" });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// ROTAS
app.register(getAllStatusRoute); // /status
app.register(getAllPrioritiesRouter); // /priorities

app.listen({ port: 3000 }).then(() => {
	console.log("Server Running!!!");
});
