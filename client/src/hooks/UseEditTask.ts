import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { UseTask } from "./UseTask";
import { api } from "../services/api";

export function UseEditTask(idTask: string) {
	const [idEdit, setIdEdit] = useState("");
	const [taskEdit, setTaskEdit] = useState("");
	const [selectPriorityEdit, setSelectPriorityEdit] = useState("");
	const [deadlineEdit, setDeadlineEdit] = useState("");
	const [selectStatusEdit, setSelectStatusEdit] = useState("");
	const [commentEdit, setCommentEdit] = useState("");

	const { UpdateTask } = UseTask();

	useEffect(() => {
		if (!idTask) return;

		setTaskEdit("");
		setSelectPriorityEdit("");
		setDeadlineEdit("");
		setSelectStatusEdit("");
		setCommentEdit("");
		setIdEdit("");

		(async () => {
			try {
				const res = await api.get("task", {
					headers: { id: idTask },
				});

				// Verifica se os dados retornados são válidos
				if (res.data && res.data.length > 0) {
					const task = res.data[0];
					setTaskEdit(task.title || "");
					setSelectPriorityEdit(task.priority || "");
					setDeadlineEdit(task.deadline || "");
					setSelectStatusEdit(task.status || "");
					setCommentEdit(task.comment || "");
					setIdEdit(task.id || "");
				}
			} catch (error) {
				console.error("Error to find task:", error);
			}
		})();
	}, [idTask]);

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
