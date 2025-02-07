import { faCircle, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UseTask } from "../../hooks/UseTask";
import { ModalNewTask } from "../../components/ModalNewTask/Index";

export function Home() {
  const {tasks, status, filterPriority, formatDate, newTaskModal, onRequestCloseNewTask} = UseTask()

  return (
    <>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-3 2xl:grid-cols-6">
        {status.map(statusElement => (
          <div className={`container-${statusElement.title.replace(" ", "-").toLowerCase()} p-2 pb-3 rounded-md flex flex-col gap-3`} key={statusElement.id}>
            <div className="flex gap-4">
              <div className={`rounded-2xl bg-gray-400 px-2 flex items-center justify-center gap-1 ${statusElement.title.replace(" ", "-")}`}>
                <FontAwesomeIcon icon={faCircle} className="text-tiny" />
                {statusElement.title}
              </div>
              <p>{tasks.filter(task => task.status === statusElement.id).length}</p>
            </div>

            {tasks.filter(({ status }) => status === statusElement.id).length === 0 ?
              <div className="rounded-sm p-2 flex flex-col gap-1">
                No Tasks
              </div>
            :
              tasks.filter(({ status }) => status === statusElement.id).map(task => (
                <div className="bg-white text-black rounded-sm p-2 shadow-xl flex flex-col gap-1" key={task.id}>
                  <div className="flex items-center justify-between">
                    <p className="font-bold">{task.title}</p>
                    <button type="button" className="hover:scale-125 duration-300" id="closeModal">
                      <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                  </div>
                  <p className="opacity-75">{formatDate(task.deadline)}</p>
                  <p className={`w-min px-2 rounded-sm ${filterPriority(task.priority).toLowerCase()}`}>{filterPriority(task.priority)}</p>
                </div>
              ))
            }
          </div>
        ))}
      </section>
      <ModalNewTask isOpen={newTaskModal} onRequestClose={onRequestCloseNewTask}/>
    </>
  )
}