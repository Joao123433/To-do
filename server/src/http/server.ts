import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import {
	type ZodTypeProvider,
	validatorCompiler,
	serializerCompiler,
} from "fastify-type-provider-zod";
import { getAllStatusRoute } from "./routes/get-all-status";
import { getAllPrioritiesRouter } from "./routes/get-all-priorities";
import { getAllTaskRoute } from "./routes/get-all-task";
import { newTaskRoute } from "./routes/create-task";
import { deleteTaskRoute } from "./routes/delete-task";
import { updateTaskRoute } from "./routes/update-task";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, { origin: "*" });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// ROTAS
app.register(getAllStatusRoute); // /status
app.register(getAllPrioritiesRouter); // /priorities

// CRUD
app.register(getAllTaskRoute); // /task
app.register(newTaskRoute); // /task
app.register(deleteTaskRoute); // /task
app.register(updateTaskRoute); // /task

app.listen({ port: 3000 }).then(() => {
	console.log("Server Running!!!");
});
