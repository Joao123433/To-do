import type { ChildrenInterface } from "../interfaces/ChildrenInterface";
import type { PrioritiesFetch } from "../interfaces/PriotiritesFetch";
import type { TaskDataContext } from "../interfaces/TaskDataContext";
import type { StatusFetch } from "../interfaces/StatusFetch";
import type { TaskFetch } from "../interfaces/TaskFetch";
import type { TaskOmit } from "../interfaces/TaskOmit";

export type TaskOmitRow = Omit<TaskFetch, "row">;

import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const TaskContext = createContext<TaskDataContext>({} as TaskDataContext)

export function TaskProvider({ children }: ChildrenInterface) {
  const [tasks, setTasks] = useState<TaskFetch[]>([]);
  const [status, useStatus] = useState<StatusFetch[]>([]);
  const [priorities, setPriorities] = useState<PrioritiesFetch[]>([]);
  const [newTaskModal, setNewTaskModal] = useState(false)
  const [editTaskModal, setEditTaskModal] = useState(false)
  const [loader, setLoader] = useState(true)
  const [elementEdit, setElementEdit] = useState("")

  useEffect(() => {
    async function fetchMyAPI() {
      await api.get("status").then((res) => useStatus(res.data));
      await api.get("priorities").then((res) => setPriorities(res.data));
      await api.get("tasks").then((res) => setTasks(res.data));
      setLoader(false);
    }

    fetchMyAPI()
  }, [])

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

    return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(date);
  }

  const isOpenNewTask = () => {
    setNewTaskModal(true)
  }

  const onRequestCloseNewTask = () => {
    setNewTaskModal(false)
  }

  const createTask = async (taskData: TaskOmit) => {
    onRequestCloseNewTask();

    try {
      const response = await api.post('task', { ...taskData });

      console.log(response)

      if (response.status === 200) setTasks((prevState) => [...prevState, response.data.taskInsert]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  const isOpenEditTask = (id: string) => {
    setEditTaskModal(true)
    setElementEdit(id)
  }

  const onRequestCloseEditTask = () => {
    setEditTaskModal(false)
    setElementEdit("")
  }

  const UpdateTask = async (taskData: TaskOmitRow) => {
    onRequestCloseEditTask()

    try {
      const response = await api.put("task", { ...taskData, updatedAt: new Date() })

      console.log(response)
      
      const taskFilter = tasks.filter(task => (task.id !== response.data.updateTaskFetch.id))

      if (response.status === 200) setTasks([...taskFilter, response.data.updateTaskFetch])
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const response = await api.delete("task", { headers: { id: id, } })
      const taskFilter = tasks.filter((task) => task.id !== response.data.deleteTaskFetch[0].id)
      
      const taskSortable = sortTasks(taskFilter)
      
      if (response.status === 200) taskFilter ? setTasks([...taskSortable]) : setTasks([])
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  const sortTasks = (tasks: TaskFetch[]) => {
    return tasks.sort((a, b) => {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    })
  }

  return (
    <TaskContext.Provider value={{ tasks, status, priorities, filterStatus, filterPriority, formatDate, newTaskModal, isOpenNewTask, onRequestCloseNewTask, createTask, loader, editTaskModal, isOpenEditTask, onRequestCloseEditTask, elementEdit, UpdateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}
