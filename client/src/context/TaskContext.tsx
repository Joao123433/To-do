import type { ChildrenInterface } from "../interfaces/ChildrenInterface";
import type { PrioritiesFetch } from "../interfaces/PriotiritesFetch";
import type { TaskDataContext } from "../interfaces/TaskDataContext";
import type { StatusFetch } from "../interfaces/StatusFetch";
import type { TaskFetch } from "../interfaces/TaskFetch";
import type { TaskOmit } from "../interfaces/TaskOmit";

import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const TaskContext = createContext<TaskDataContext>({} as TaskDataContext)

export function TaskProvider({ children }: ChildrenInterface) {
  const [tasks, setTask] = useState<TaskFetch[]>([]);
  const [status, useStatus] = useState<StatusFetch[]>([]);
  const [priorities, setPriorities] = useState<PrioritiesFetch[]>([]);
  const [newTaskModal, setNewTaskModal] = useState(false)

  useEffect(() => {
    api.get("tasks").then((res) => setTask(res.data));
    api.get("status").then((res) => useStatus(res.data));
    api.get("priorities").then((res) => setPriorities(res.data));
  }, []);

  const filterStatus = (id_status: string) => {
    const filteredStatus = status.filter(({ id }) => id === id_status)

    return filteredStatus[0].title
  }

  const filterPriority = (id_priority: string) => {
    const filteredPriorities = priorities.filter(({ id }) => id === id_priority)

    return filteredPriorities[0].title
  }

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString)

    return  new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(date);
  }

  const isOpenNewTask = () => {
    setNewTaskModal(true)
  }

  const onRequestCloseNewTask = () => {
    setNewTaskModal(false)
  }

  const createTask = async (taskData: TaskOmit) => {
    const response = await api.post('task', {...taskData})

    const task = response.data

    setTask((prevState) => [...prevState, task])
    onRequestCloseNewTask()
  }

  return (
    <TaskContext.Provider value={{tasks, status, priorities, filterStatus, filterPriority, formatDate, newTaskModal, isOpenNewTask, onRequestCloseNewTask, createTask}}>
      {children}
    </TaskContext.Provider>
  )
}