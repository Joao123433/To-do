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
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/routes/get-task-by-status.ts
var get_task_by_status_exports = {};
__export(get_task_by_status_exports, {
  getTaskHighPrioirty: () => getTaskHighPrioirty
});
module.exports = __toCommonJS(get_task_by_status_exports);

// src/app/function/get-high-priority-tasks.ts
var import_drizzle_orm = require("drizzle-orm");

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

// src/app/function/get-high-priority-tasks.ts
async function fetchIdPriority() {
  const highPriorityId = await db.select({
    id: priority.id
  }).from(priority).where((0, import_drizzle_orm.eq)(priority.title, "High"));
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
  }).from(task).where((0, import_drizzle_orm.eq)(task.priority, idHighPriority));
  return { taksHighPriority };
}

// src/http/routes/get-task-by-status.ts
var getTaskHighPrioirty = async (app) => {
  app.get("/high-priority", async (req, res) => {
    const { taksHighPriority } = await getHighPriorityTasks();
    return taksHighPriority;
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getTaskHighPrioirty
});
