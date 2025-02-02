import { text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const status = pgTable("status", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	title: text("title"),
});
