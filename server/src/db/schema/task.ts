import { createId } from "@paralleldrive/cuid2";
import { pgTable, text } from "drizzle-orm/pg-core";
import { priority } from "./priority";
import { status } from "./status";
import { timestamp } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";

export const task = pgTable("task", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	title: text("title").notNull(),
	priority: text("priority")
		.references(() => priority.id)
		.notNull(),
	deadline: timestamp("deadline", { withTimezone: true }).notNull(),
	status: text("status")
		.references(() => status.id)
		.notNull(),
	comment: text("comment"),
	row: integer("row").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});
