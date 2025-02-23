import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Menu, MenuHandler, MenuList } from "@material-tailwind/react"
import { ModalEditTask } from "../../components/ModalEditTask/Index"
import { ModalNewTask } from "../../components/ModalNewTask/Index"
import { UseTask } from "../../hooks/UseTask"
import { UseTaskNext7Days } from "../../hooks/UseTaskNext7Days"

export function Next7Days() {
  const {filterPriority, formatDate, loader, newTaskModal, onRequestCloseNewTask, editTaskModal, isOpenEditTask, onRequestCloseEditTask, elementEdit, deleteTask} = UseTask()
  const { taskNext7Days } = UseTaskNext7Days()

  return (
    <>
      {!loader ? 
        (
          <div className="relative overflow-x-auto">
            {!taskNext7Days.length ? 
              (
                <div className="rounded-sm p-2 flex flex-col gap-1">
                  No Tasks
                </div>
              ) : 
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs uppercase">
                  <tr className="border-b">
                    <th scope="col" className="px-6 py-3">
                      Task Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Deadline
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {taskNext7Days.map(task => (
                    <tr key={task.id}>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {task.title}
                      </th>
                      <td className="px-6 py-4">
                      <p className={`w-min px-2 rounded-sm ${filterPriority(task.priority).toLowerCase()}`}>{filterPriority(task.priority)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="opacity-75">{formatDate(task.deadline)}</p>
                      </td>
                      <td className="px-6 py-4">
                        {task.comment}
                      </td>
                      <td className="px-6 py-4">
                        <Menu animate={{mount: { y: 0 }, unmount: { y: 25 }}}>
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
            <ModalNewTask isOpen={newTaskModal} onRequestClose={onRequestCloseNewTask} />
            <ModalEditTask isOpen={editTaskModal} onRequestClose={onRequestCloseEditTask} idTask={elementEdit} />
          </div>
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
    </>
  )
}