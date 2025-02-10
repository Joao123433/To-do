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
		setTaskEdit("");
		setSelectPriorityEdit("");
		setDeadlineEdit("");
		setSelectStatusEdit("");
		setCommentEdit("");

		setIdEdit("");

		(async () => {
			await api
				.get("task", {
					headers: {
						id: idTask,
					},
				})
				.then((res) => {
					setTaskEdit(res.data[0].title);
					setSelectPriorityEdit(res.data[0].priority);
					setDeadlineEdit(res.data[0].deadline);
					setSelectStatusEdit(res.data[0].status);
					setCommentEdit(res.data[0].comment);
					setIdEdit(res.data[0].id);
				});
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
