import { pgTable } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { date } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	email: text("email").notNull(),
	password: text("password").notNull(),
	name: text("name").notNull(),
	createdAt: date("createdAt").notNull(),
	updatedAt: date("updated_at").notNull(),
});
