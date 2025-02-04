import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export function UseTask() {
	const context = useContext(TaskContext);

	return context;
}
