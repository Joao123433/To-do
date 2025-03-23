CREATE TABLE "priority" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "status" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"column" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "task" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"priority" text NOT NULL,
	"deadline" timestamp with time zone NOT NULL,
	"status" text NOT NULL,
	"comment" text,
	"row" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_priority_priority_id_fk" FOREIGN KEY ("priority") REFERENCES "public"."priority"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_status_status_id_fk" FOREIGN KEY ("status") REFERENCES "public"."status"("id") ON DELETE no action ON UPDATE no action;