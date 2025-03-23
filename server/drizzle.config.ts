import { env } from "./src/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./dist/db/schema/index.ts",
	out: "./.migrations",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	dialect: "postgresql",
});
