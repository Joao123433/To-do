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
import { CheckToukenRouter } from "./routes/users/check-token";

const app = fastify({
	logger: {
		level: "warn",
	},
}).withTypeProvider<ZodTypeProvider>();

// CORS
app.register(fastifyCors, {
	origin: true,
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE"],
});

// FASTIFY COOKIES
app.register(fastifyCookie, {
	// parseOptions: {
	// 	httpOnly: true,
	// 	sameSite: "none",
	// },
	parseOptions: {},
});

// JWT
app.register(fastifyJwt, {
	secret:
		"6c6d10fa570c80298b2908cd732f2c863ce4f8597e05774bdc4dbbf8c38137368f57d43a84718c0353a50545c9cc4879eb97175c0458fc768bec16d3297d102580934659bd2c15302524ce9a97348fc86def4f1ef0b60198cfd3076d28bcb124394b6cd84a65cda25ded31c85ff66883cbbe1f5bd20219f039e64011043b09bd",
	sign: { algorithm: "HS256" },
});

app.addHook("onRequest", async (req, res) => {
	if (
		req.url === "/login" ||
		req.url === "/register" ||
		req.url === "/check-token"
	) {
		return;
	}

	try {
		// Pegue o token corretamente
		const token = req.cookies.token;

		if (!token) res.status(404).send({ message: "Token não encontrado" });

		const decoded = app.jwt.verify(token as string);
		req.user = decoded;
		console.log("Usuário autenticado:", decoded);
		// res.status(200).send({ message: "Usuário autenticado" });
	} catch (err) {
		console.error("Erro ao autenticar:", err);
		res.status(401).send({ message: "Token inválido" });
	}
});

// MIDDLEWARE
// app.addHook("onRequest", AuthMiddleware);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(CheckToukenRouter); // /check-token

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
