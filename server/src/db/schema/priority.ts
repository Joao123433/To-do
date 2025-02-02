import { createId } from "@paralleldrive/cuid2";
import { text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const priority = pgTable("priority", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	title: text("title"),
});
