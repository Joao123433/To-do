import fastify from "fastify";
import {
	type ZodTypeProvider,
	validatorCompiler,
	serializerCompiler,
} from "fastify-type-provider-zod";

import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

import { RegisterRouter } from "./routes/users/register";
import { LoginRouter } from "./routes/users/login";
import { LogoutRouter } from "./routes/users/logout";
import { AuthMiddleware } from "./middleware/AuthMiddleware";

import { getTaskHighPrioirtyRouter } from "./routes/filters/get-task-by-status";
import { getNext7DaysTasksRouter } from "./routes/filters/get-next-7-days-tasks";

import { StatusRouter } from "./routes/status";
import { TaskRouter } from "./routes/tasks";
import { PrioritiesRouter } from "./routes/priorities";
import { ArchivedTasksrouter } from "./routes/filters/archived-tasks";

import { PostTaskRouter } from "./routes/task/post";
import { GetTaskRouter } from "./routes/task/get";
import { DeleteTaskRouter } from "./routes/task/delete";
import { PutTaskRouter } from "./routes/task/put";

const app = fastify().withTypeProvider<ZodTypeProvider>();

// CORS
app.register(fastifyCors, {
	origin: true,
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE"],
});

// JWT
app.register(fastifyJwt, {
	secret: String(process.env.JWT_SECRET),
});

// FASTIFY COOKIES
app.register(fastifyCookie, {
	secret: process.env.COOKIE_SECRET,
	hook: "onRequest",
	parseOptions: {},
});

// MIDDLEWARE
app.addHook("onRequest", AuthMiddleware);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// ROTAS
app.register(StatusRouter); // /status
app.register(PrioritiesRouter); // /priorities
app.register(TaskRouter); // /tasks/GET

// CRUD - TASK
app.register(PostTaskRouter); // /task/POST
app.register(GetTaskRouter); // /task/GET:id
app.register(DeleteTaskRouter); // /task/DELETE:id
app.register(PutTaskRouter); // /task/PUT:id

// USERS
app.register(RegisterRouter);
app.register(LoginRouter);
app.register(LogoutRouter);

// TASKS FILTERS
app.register(getTaskHighPrioirtyRouter); // task-status
app.register(getNext7DaysTasksRouter); // next 7 days
app.register(ArchivedTasksrouter); // Archived

app
	.listen({
		port: process.env.port ? Number(process.env.port) : 3000,
		host: "0.0.0.0",
	})
	.then(() => {
		console.log("Server Running!!!");
	});
