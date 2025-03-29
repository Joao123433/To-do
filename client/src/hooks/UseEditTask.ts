import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { UseTask } from "./UseTask";

export function UseEditTask(idTask: string) {
	const [idEdit, setIdEdit] = useState("");
	const [taskEdit, setTaskEdit] = useState("");
	const [selectPriorityEdit, setSelectPriorityEdit] = useState("");
	const [deadlineEdit, setDeadlineEdit] = useState("");
	const [selectStatusEdit, setSelectStatusEdit] = useState("");
	const [commentEdit, setCommentEdit] = useState("");

	const { tasks, UpdateTask } = UseTask();
	const taskFiltered = tasks.filter((task) => task.id === idTask)[0];

	useEffect(() => {
		if (taskFiltered) {
			setIdEdit(taskFiltered.id);
			setTaskEdit(taskFiltered.title);
			setSelectPriorityEdit(taskFiltered.priority);
			setDeadlineEdit(dayjs(taskFiltered.deadline).format("YYYY-MM-DD"));
			setSelectStatusEdit(taskFiltered.status);
			setCommentEdit(taskFiltered.comment);
		}
	}, [taskFiltered]);

	const handleClickEdit = () => {
		const EditTask = {
			id: idEdit,
			title: taskEdit,
			priority: selectPriorityEdit,
			deadline: dayjs(deadlineEdit).toDate(),
			status: selectStatusEdit,
			comment: commentEdit,
		};

		setIdEdit("");
		setTaskEdit("");
		setSelectPriorityEdit("");
		setDeadlineEdit("");
		setSelectStatusEdit("");
		setCommentEdit("");

		UpdateTask(EditTask);
	};

	return {
		taskEdit,
		setTaskEdit,
		selectPriorityEdit,
		setSelectPriorityEdit,
		deadlineEdit,
		setDeadlineEdit,
		selectStatusEdit,
		setSelectStatusEdit,
		commentEdit,
		setCommentEdit,
		handleClickEdit,
	};
}
