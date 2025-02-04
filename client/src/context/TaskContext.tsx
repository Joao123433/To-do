import type { ChildrenInterface } from "../interfaces/ChildrenInterface";
import type { PrioritiesFetch } from "../interfaces/PriotiritesFetch";
import type { TaskDataContext } from "../interfaces/TaskDataContext";
import type { StatusFetch } from "../interfaces/StatusFetch";
import type { TaskFetch } from "../interfaces/TaskFetch";
import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const TaskContext = createContext<TaskDataContext>({} as TaskDataContext)

export function TaskProvider({ children }: ChildrenInterface) {
  const [task, setTask] = useState<TaskFetch[]>([]);
  const [status, useStatus] = useState<StatusFetch[]>([]);
  const [priorities, setPriorities] = useState<PrioritiesFetch[]>([]);

  useEffect(() => {
		api.get("tasks").then((res) => setTask(res.data));
    api.get("status").then((res) => useStatus(res.data));
		api.get("priorities").then((res) => setPriorities(res.data));
  }, []);


  return (
    <TaskContext.Provider value={{task ,status, priorities}}>
      {children}
    </TaskContext.Provider>
  )
}