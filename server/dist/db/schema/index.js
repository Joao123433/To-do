"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/db/schema/index.ts
var schema_exports = {};
__export(schema_exports, {
  priority: () => priority,
  status: () => status,
  task: () => task
});
module.exports = __toCommonJS(schema_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  priority,
  status,
  task
});
