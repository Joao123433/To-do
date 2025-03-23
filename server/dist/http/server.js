"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/http/server.ts
var import_cors = __toESM(require("@fastify/cors"));
var import_fastify = __toESM(require("fastify"));
var import_fastify_type_provider_zod = require("fastify-type-provider-zod");

// src/db/index.ts
var import_postgres = __toESM(require("postgres"));

// src/env.ts
var import_zod = __toESM(require("zod"));
var schema = import_zod.default.object({
  DATABASE_URL: import_zod.default.string().url()
});
var env = schema.parse(process.env);

// src/db/schema/index.ts
var schema_exports = {};
__export(schema_exports, {
  priority: () => priority,
  status: () => status,
  task: () => task
});

// src/db/schema/priority.ts
var import_cuid2 = require("@paralleldrive/cuid2");
var import_pg_core = require("drizzle-orm/pg-core");
var priority = (0, import_pg_core.pgTable)("priority", {
  id: (0, import_pg_core.text)("id").primaryKey().$defaultFn(() => (0, import_cuid2.createId)()).notNull(),
  title: (0, import_pg_core.text)("title").notNull()
});

// src/db/schema/status.ts
var import_pg_core2 = require("drizzle-orm/pg-core");
var import_pg_core3 = require("drizzle-orm/pg-core");
var import_cuid22 = require("@paralleldrive/cuid2");
var status = (0, import_pg_core3.pgTable)("status", {
  id: (0, import_pg_core2.text)("id").primaryKey().$defaultFn(() => (0, import_cuid22.createId)()).notNull(),
  title: (0, import_pg_core2.text)("title").notNull(),
  column: (0, import_pg_core2.text)("column").notNull()
});

// src/db/schema/task.ts
var import_cuid23 = require("@paralleldrive/cuid2");
var import_pg_core4 = require("drizzle-orm/pg-core");
var import_pg_core5 = require("drizzle-orm/pg-core");
var import_pg_core6 = require("drizzle-orm/pg-core");
var task = (0, import_pg_core4.pgTable)("task", {
  id: (0, import_pg_core4.text)("id").primaryKey().$defaultFn(() => (0, import_cuid23.createId)()),
  title: (0, import_pg_core4.text)("title").notNull(),
  priority: (0, import_pg_core4.text)("priority").references(() => priority.id).notNull(),
  deadline: (0, import_pg_core5.timestamp)("deadline", { withTimezone: true }).notNull(),
  status: (0, import_pg_core4.text)("status").references(() => status.id).notNull(),
  comment: (0, import_pg_core4.text)("comment"),
  row: (0, import_pg_core6.integer)("row").notNull(),
  createdAt: (0, import_pg_core5.timestamp)("created_at", { withTimezone: true }).notNull(),
  updatedAt: (0, import_pg_core5.timestamp)("updated_at", { withTimezone: true }).notNull()
});

// src/db/index.ts
var import_postgres_js = require("drizzle-orm/postgres-js");
var client = (0, import_postgres.default)(env.DATABASE_URL);
var db = (0, import_postgres_js.drizzle)(client, { schema: schema_exports });

// src/app/function/get-all-status.ts
async function getAllStatus() {
  const allStatus = await db.select({
    id: status.id,
    title: status.title,
    column: status.column
  }).from(status);
  return { allStatus };
}

// src/http/routes/get-all-status.ts
var getAllStatusRoute = async (app2) => {
  app2.get("/status", {}, async () => {
    const { allStatus } = await getAllStatus();
    return allStatus;
  });
};

// src/app/function/get-all-priorities.ts
async function getAllPriorities() {
  const allPriorities = await db.select({
    id: priority.id,
    title: priority.title
  }).from(priority);
  return { allPriorities };
}

// src/http/routes/get-all-priorities.ts
var getAllPrioritiesRouter = async (app2) => {
  app2.get("/priorities", {}, async () => {
    const { allPriorities } = await getAllPriorities();
    return allPriorities;
  });
};

// src/app/function/get-all-tasks.ts
async function getAllTask() {
  const allTask = await db.select({
    id: task.id,
    title: task.title,
    priority: task.priority,
    deadline: task.deadline,
    status: task.status,
    comment: task.comment,
    row: task.row,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt
  }).from(task);
  return { allTask };
}

// src/http/routes/get-all-task.ts
var getAllTaskRoute = async (app2) => {
  app2.get("/tasks", {}, async () => {
    const { allTask } = await getAllTask();
    return allTask;
  });
};

// src/http/routes/create-task.ts
var import_zod2 = __toESM(require("zod"));

// src/app/function/create-task.ts
var import_drizzle_orm = require("drizzle-orm");
async function generateNextRow(idStatus) {
  const lastTask = await db.select({
    row: task.row
  }).from(task).where((0, import_drizzle_orm.eq)(task.status, idStatus)).orderBy((0, import_drizzle_orm.desc)(task.row));
  if (!lastTask || lastTask.length === 0) {
    return 1;
  }
  const lastNumber = lastTask[0].row;
  const nextNumber = lastNumber + 1;
  return nextNumber;
}
async function createTask({
  title,
  priority: priority2,
  deadline,
  status: status2,
  comment,
  createdAt,
  updatedAt
}) {
  const row = await generateNextRow(status2);
  const [taskInsert] = await db.insert(task).values({
    title,
    priority: priority2,
    deadline,
    status: status2,
    comment,
    row,
    createdAt,
    updatedAt
  }).returning();
  return { taskInsert };
}

// src/http/routes/create-task.ts
var import_dayjs = __toESM(require("dayjs"));
var newTaskRoute = async (app2) => {
  app2.post(
    "/task",
    {
      schema: {
        body: import_zod2.default.object({
          title: import_zod2.default.string(),
          priority: import_zod2.default.string(),
          deadline: import_zod2.default.string(),
          status: import_zod2.default.string(),
          comment: import_zod2.default.string()
        })
      }
    },
    async (req, res) => {
      const { title, priority: priority2, deadline, status: status2, comment } = req.body;
      const currentDay = (0, import_dayjs.default)();
      const { taskInsert } = await createTask({
        title,
        priority: priority2,
        deadline: (0, import_dayjs.default)(deadline).toDate(),
        status: status2,
        comment,
        createdAt: currentDay.toDate(),
        updatedAt: currentDay.toDate()
      });
      return taskInsert;
    }
  );
};

// src/http/routes/delete-task.ts
var import_zod3 = __toESM(require("zod"));

// src/app/function/delete-task.ts
var import_drizzle_orm2 = require("drizzle-orm");
async function deleteTask(idTask) {
  const deleteTaskFetch = db.delete(task).where((0, import_drizzle_orm2.eq)(task.id, idTask)).returning();
  return {
    deleteTaskFetch
  };
}

// src/http/routes/delete-task.ts
var deleteTaskRoute = async (app2) => {
  app2.delete(
    "/task",
    {
      schema: {
        headers: import_zod3.default.object({
          id: import_zod3.default.string()
        })
      }
    },
    async (req, res) => {
      const id = req.headers.id;
      const { deleteTaskFetch } = await deleteTask(id);
      return deleteTaskFetch;
    }
  );
};

// src/http/routes/update-task.ts
var import_zod4 = __toESM(require("zod"));

// src/app/function/update-task.ts
var import_drizzle_orm3 = require("drizzle-orm");
async function updateTask({
  id,
  title,
  priority: priority2,
  deadline,
  status: status2,
  comment,
  updatedAt
}) {
  const updateTaskFetch = db.update(task).set({
    title,
    priority: priority2,
    deadline: new Date(deadline),
    status: status2,
    comment,
    updatedAt: new Date(updatedAt)
  }).where((0, import_drizzle_orm3.eq)(task.id, id)).returning();
  return {
    updateTaskFetch
  };
}

// src/http/routes/update-task.ts
var import_dayjs2 = __toESM(require("dayjs"));
var updateTaskRoute = async (app2) => {
  app2.put(
    "/task",
    {
      schema: {
        body: import_zod4.default.object({
          id: import_zod4.default.string(),
          title: import_zod4.default.string(),
          priority: import_zod4.default.string(),
          deadline: import_zod4.default.string(),
          status: import_zod4.default.string(),
          comment: import_zod4.default.string()
        })
      }
    },
    async (req, res) => {
      const { id, title, priority: priority2, deadline, status: status2, comment } = req.body;
      const currentDay = (0, import_dayjs2.default)();
      const { updateTaskFetch } = await updateTask({
        id,
        title,
        priority: priority2,
        deadline: (0, import_dayjs2.default)(deadline).toDate(),
        status: status2,
        comment,
        updatedAt: currentDay.toDate()
      });
      return updateTaskFetch;
    }
  );
};

// src/http/routes/get-task.ts
var import_zod5 = __toESM(require("zod"));

// src/app/function/get-task.ts
var import_drizzle_orm4 = require("drizzle-orm");
async function getTask(idTask) {
  const taskFetch = await db.select({
    id: task.id,
    title: task.title,
    priority: task.priority,
    deadline: task.deadline,
    status: task.status,
    comment: task.comment
  }).from(task).where((0, import_drizzle_orm4.eq)(task.id, idTask));
  return { taskFetch };
}

// src/http/routes/get-task.ts
var getTaskRouter = async (app2) => {
  app2.get(
    "/task",
    {
      schema: {
        headers: import_zod5.default.object({
          id: import_zod5.default.string()
        })
      }
    },
    async (req, res) => {
      const id = req.headers.id;
      const { taskFetch } = await getTask(id);
      return taskFetch;
    }
  );
};

// src/app/function/get-high-priority-tasks.ts
var import_drizzle_orm5 = require("drizzle-orm");
async function fetchIdPriority() {
  const highPriorityId = await db.select({
    id: priority.id
  }).from(priority).where((0, import_drizzle_orm5.eq)(priority.title, "High"));
  const id = highPriorityId[0].id;
  return id;
}
async function getHighPriorityTasks() {
  const idHighPriority = await fetchIdPriority();
  const taksHighPriority = await db.select({
    id: task.id,
    title: task.title,
    priority: task.priority,
    deadline: task.deadline,
    status: task.status,
    comment: task.comment
  }).from(task).where((0, import_drizzle_orm5.eq)(task.priority, idHighPriority));
  return { taksHighPriority };
}

// src/http/routes/get-task-by-status.ts
var getTaskHighPrioirty = async (app2) => {
  app2.get("/high-priority", async (req, res) => {
    const { taksHighPriority } = await getHighPriorityTasks();
    return taksHighPriority;
  });
};

// src/app/function/get-next-7-days-tasks.ts
var import_dayjs3 = __toESM(require("dayjs"));
var import_drizzle_orm6 = require("drizzle-orm");
async function getNext7DaysTasks() {
  const currentDate = (0, import_dayjs3.default)().startOf("day").toDate();
  const OneWeekLater = (0, import_dayjs3.default)().add(7, "day").startOf("day").toDate();
  const filterTasks = db.select({
    id: task.id,
    title: task.title,
    priority: task.priority,
    deadline: task.deadline,
    status: task.status,
    comment: task.comment
  }).from(task).where((0, import_drizzle_orm6.between)(task.deadline, currentDate, OneWeekLater));
  return { filterTasks };
}

// src/http/routes/get-next-7-days-tasks.ts
var getNext7DaysTasksRouter = async (app2) => {
  app2.get("/next7days", async (req, res) => {
    const { filterTasks } = await getNext7DaysTasks();
    return filterTasks;
  });
};

// src/http/server.ts
var app = (0, import_fastify.default)().withTypeProvider();
app.register(import_cors.default, { origin: "*" });
app.setValidatorCompiler(import_fastify_type_provider_zod.validatorCompiler);
app.setSerializerCompiler(import_fastify_type_provider_zod.serializerCompiler);
app.register(getAllStatusRoute);
app.register(getAllPrioritiesRouter);
app.register(newTaskRoute);
app.register(getAllTaskRoute);
app.register(getTaskRouter);
app.register(deleteTaskRoute);
app.register(updateTaskRoute);
app.register(getTaskHighPrioirty);
app.register(getNext7DaysTasksRouter);
app.listen({ port: 3e3 }).then(() => {
  console.log("Server Running!!!");
});
