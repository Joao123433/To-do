import type { TaskFetch } from "./TaskFetch";

export type TaskOmit = Omit<TaskFetch, "id">;
