import type { ChildrenInterface } from "../interfaces/ChildrenInterface";
import type { PrioritiesFetch } from "../interfaces/PriotiritesFetch";
import type { TaskDataContext } from "../interfaces/TaskDataContext";
import type { StatusFetch } from "../interfaces/StatusFetch";
import type { TaskFetch } from "../interfaces/TaskFetch";
import type { TaskOmit } from "../interfaces/TaskOmit";

export type TaskOmitRow = Omit<TaskFetch, "row">;

import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../hooks/UseAuth";
import { toast } from "react-toastify";

export const TaskContext = createContext<TaskDataContext>({} as TaskDataContext)

export function TaskProvider({ children }: ChildrenInterface) {
  const [tasks, setTasks] = useState<TaskFetch[]>([]);
  const [status, setStatus] = useState<StatusFetch[]>([]);
  const [priorities, setPriorities] = useState<PrioritiesFetch[]>([]);
  const [newTaskModal, setNewTaskModal] = useState(false)
  const [editTaskModal, setEditTaskModal] = useState(false)
  const [elementEdit, setElementEdit] = useState("")
  const { isAuthenticated } = useAuth();
  
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    async function fetchMyAPI() {
      if (!isAuthenticated) {
        setTasks([]);
        setStatus([]);
        setPriorities([]);
        return;
      }

      try {
        const statusResponse = await api.get("status", { withCredentials: true });
        setStatus(statusResponse.data);

        const prioritiesResponse = await api.get("priorities", { withCredentials: true });
        setPriorities(prioritiesResponse.data);

        const tasksResponse = await api.get("tasks", { withCredentials: true });
        setTasks(tasksResponse.data);

        setLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchMyAPI();
  }, [isAuthenticated]);

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

    toast.promise(
      api.post('task', { ...taskData })
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            setTasks(prevState => [...prevState, response.data.taskInsert]);
            sortTasks();
          }
          return response;
        }),
      {
        pending: 'Creating task...',
        success: 'Task created successfully!',
      }
    ).catch(error => {
      toast.error(error.response.data.message)
    });
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

    toast.promise(
      api.put("task", { ...taskData, updatedAt: new Date() })
        .then(response => {
          if(response.status === 200) {
            const taskFilter = tasks.filter(task => task.id !== response.data.updateTaskFetch.id);
            setTasks([...taskFilter, response.data.updateTaskFetch]);
            sortTasks();
          }
          return response;
        }),
      {
        pending: "Updating task...",
        success: "Task updated successfully!",
      }
    ).catch(error => {
      toast.error(error.response.data.message)
    });
  }

  const deleteTask = async (id: string) => {
    toast.promise(
      api.delete("task", { headers: { id: id, } })
        .then(response => {
          if(response.status === 200) {
            const taskFilter = tasks.filter((task) => task.id !== response.data.deleteTaskFetch[0].id)
            taskFilter ? setTasks([...taskFilter]) : setTasks([])
            sortTasks();
          }

          return response;
        }),
      {
        pending: "Deleting task...",
        success: "Task deleted successfully!",
      }
    ).catch(error => {
      toast.error(error.response.data.message)
    });
  }

  const sortTasks = () => {
    setTasks((prevState) => {
      return prevState.sort((a, b) => {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      })
    })
  }

  return (
    <TaskContext.Provider value={{ tasks, status, priorities, filterStatus, filterPriority, formatDate, newTaskModal, isOpenNewTask, onRequestCloseNewTask, createTask, loader, editTaskModal, isOpenEditTask, onRequestCloseEditTask, elementEdit, UpdateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}
