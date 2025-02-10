import dayjs from "dayjs";
import { useState } from "react";
import { UseTask } from "./UseTask";

export function UseNewTask() {
	const [task, setTask] = useState("New Task");
	const [selectPriority, setSelectPriority] = useState("");
	const [deadline, setDeadline] = useState("");
	const [selectStatus, setSelectStatus] = useState("");
	const [comment, setComment] = useState("");

	const { createTask } = UseTask();

	const handleClick = () => {
		const NewTask = {
			title: task,
			priority: selectPriority,
			deadline: dayjs(deadline).toDate(),
			status: selectStatus,
			comment: comment,
		};

		setTask("New Task");
		setSelectPriority("");
		setDeadline("");
		setSelectStatus("");
		setComment("");

		createTask(NewTask);
	};

	return {
		task,
		setTask,
		selectPriority,
		setSelectPriority,
		deadline,
		setDeadline,
		selectStatus,
		setSelectStatus,
		comment,
		setComment,
		handleClick,
	};
}
