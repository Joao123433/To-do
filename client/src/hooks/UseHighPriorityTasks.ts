import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { TaskFetch } from "../interfaces/TaskFetch";
import { UseTask } from "./UseTask";

export function UseHighPriorityTasks() {
	const [taskHighPriority, setTaskHighPriority] = useState<TaskFetch[]>([]);
	const { tasks } = UseTask();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		(async () => {
			const res = await api.get("high-priority");

			// Verifica se os dados retornados são válidos
			if (res.data) {
				setTaskHighPriority(res.data);
			}
		})();
	}, [tasks]);

	return { taskHighPriority };
}
