import { createId } from "@paralleldrive/cuid2";
import { pgTable, text } from "drizzle-orm/pg-core";
import { priority } from "./priority";
import { status } from "./status";
import { timestamp } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";

export const task = pgTable("task", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	title: text("title").notNull(),
	priority: text("priority")
		.references(() => priority.id)
		.notNull(),
	deadline: timestamp("deadline").notNull(),
	status: text("status")
		.references(() => status.id)
		.notNull(),
	comment: text("comment"),
	finished: boolean("finished"),
	row: text("row"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});
