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
import { getTaskRouter } from "./routes/get-task";
import { getTaskHighPrioirty } from "./routes/get-task-by-status";
import { getNext7DaysTasksRouter } from "./routes/get-next-7-days-tasks";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, { origin: "*" });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// ROTAS
app.register(getAllStatusRoute); // /status
app.register(getAllPrioritiesRouter); // /priorities

// CRUD
app.register(newTaskRoute); // /task/POST
app.register(getAllTaskRoute); // /tasks/GET
app.register(getTaskRouter); // /task/GET:id
app.register(deleteTaskRoute); // /task/DELETE:id
app.register(updateTaskRoute); // /task/PUT:id

// TASKS FILTERS
app.register(getTaskHighPrioirty); // task-status
app.register(getNext7DaysTasksRouter); // next 7 days

app.listen({ port: 3000 }).then(() => {
	console.log("Server Running!!!");
});
