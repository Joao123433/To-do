import { createId } from "@paralleldrive/cuid2";
import { pgTable, text } from "drizzle-orm/pg-core";

export const priority = pgTable("priority", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId())
		.notNull(),
	title: text("title").notNull(),
});
