import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { TaskFetch } from "../interfaces/TaskFetch";
import { UseTask } from "./UseTask";

export function UseTaskNext7Days() {
	const [taskNext7Days, setTaskNext7Days] = useState<TaskFetch[]>([]);
	const { tasks } = UseTask();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		(async () => {
			const res = await api.get("next7days");

			// Verifica se os dados retornados são válidos
			if (res.data) {
				setTaskNext7Days(res.data);
			}
		})();
	}, [tasks]);

	return { taskNext7Days };
}
