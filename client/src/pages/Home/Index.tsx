import { faCircle, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UseTask } from "../../hooks/UseTask";
import { ModalNewTask } from "../../components/ModalNewTask/Index";
import { spiral } from 'ldrs'
import 'animate.css';
import {
  Menu,
  MenuHandler,
  MenuList,
} from "@material-tailwind/react";
import { ModalEditTask } from "../../components/ModalEditTask/Index";

spiral.register('my-precious')
export function Home() {
  const {tasks, status, filterPriority, formatDate, newTaskModal, onRequestCloseNewTask, loader, editTaskModal, isOpenEditTask, onRequestCloseEditTask, elementEdit, deleteTask} = UseTask()


  return (
    <>
      {!loader ? 
        (
          <section className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-3 2xl:grid-cols-6">
            {status.map(statusElement => (
            <div className={"p-2 pb-3 rounded-md flex flex-col gap-3"} key={statusElement.id}>
              <div className="flex gap-4">
                <div className={`rounded-2xl bg-gray-400 px-2 flex items-center justify-center gap-1 ${statusElement.title.replace(" ", "-")} `}>
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
                  <div className="bg-white text-black rounded-sm p-2 shadow-xl flex flex-col gap-1 animate__animated animate__fadeInUpBig" key={task.id}>
                    <div className="flex items-center justify-between">
                      <p className="font-bold">{task.title}</p>
                      <Menu>
                        <MenuHandler className="hover:scale-100 duration-300" id="closeModal">
                          <FontAwesomeIcon icon={faEllipsis} />
                        </MenuHandler>
                        <MenuList className="flex flex-col gap-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                          <button type="button" onClick={() => isOpenEditTask(task.id)} className="py-1 border-0 outline-0 hover:brightness-75 duration-300" id="dropdown">
                            Edit
                          </button>
                          <button type="button" onClick={() => deleteTask(task.id)} className="py-1 border-0 outline-0 hover:brightness-75 duration-300" id="dropdown">
                            Delete
                          </button>
                        </MenuList>
                      </Menu>
                    </div>
                    <p className="opacity-75">{formatDate(task.deadline)}</p>
                    <p className={`w-min px-2 rounded-sm ${filterPriority(task.priority).toLowerCase()}`}>{filterPriority(task.priority)}</p>
                  </div>
                ))
              }
            </div>
            ))}
          </section>
        ) :
        (
          <section className="grid grid-cols-1 gap-5 md:gap-3 2xl:grid-cols-2 mt-24">
            <div className="flex items-center justify-center">
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
              <my-precious color="white" className="col-end-4"></my-precious>
            </div>
          </section>
        )
      }
      <ModalNewTask isOpen={newTaskModal} onRequestClose={onRequestCloseNewTask} />
      <ModalEditTask isOpen={editTaskModal} onRequestClose={onRequestCloseEditTask} idTask={elementEdit} />
    </>
  )
}