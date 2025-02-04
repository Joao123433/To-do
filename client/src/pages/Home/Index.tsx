import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UseTask } from "../../hooks/UseTask";

export function Home() {
  const {task, status, priorities} = UseTask()

  console.log(task)
  console.log(status)
  console.log(priorities)

  return (
    <>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-3 2xl:grid-cols-6">
        <div className="bg-to-do p-2 pb-3 rounded-md flex flex-col gap-3">
          <div className="flex gap-4">
            <div className="rounded-2xl bg-gray-400 px-2 flex items-center justify-center gap-1">
              <FontAwesomeIcon icon={faCircle} className="text-tiny" />
              To-Do
            </div>
            <p>5</p>
          </div>
          <div className="bg-white text-black rounded-sm p-2 shadow-xl flex flex-col gap-1">
            <p className="font-bold">Lorem ipsum dolor sit</p>
            <p className="opacity-75">January 15, 2025</p>
            <p className="bg-red-300 w-min px-2 rounded-sm">Medium</p>
          </div>
          <div className="bg-white text-black rounded-sm p-2 shadow-xl flex flex-col gap-1">
            <p className="font-bold">Lorem ipsum dolor sit</p>
            <p className="opacity-75">January 15, 2025</p>
            <p className="bg-red-300 w-min px-2 rounded-sm">Medium</p>
          </div>
          <div className="bg-white text-black rounded-sm p-2 shadow-xl flex flex-col gap-1">
            <p className="font-bold">Lorem ipsum dolor sit</p>
            <p className="opacity-75">January 15, 2025</p>
            <p className="bg-red-300 w-min px-2 rounded-sm">Medium</p>
          </div>
        </div>
        <div className="bg-in-progress p-2 pb-3 rounded-md flex flex-col gap-3">
          <div className="flex gap-4">
            <div className="rounded-2xl bg-gray-400 px-2 flex items-center justify-center gap-1">
              <FontAwesomeIcon icon={faCircle} className="text-tiny" />
              To-Do
            </div>
            <p>5</p>
          </div>
          <div className="bg-white text-black rounded-sm p-2 shadow-xl flex flex-col gap-1">
            <p className="font-bold">Lorem ipsum dolor sit</p>
            <p className="opacity-75">January 15, 2025</p>
            <p className="bg-red-300 w-min px-2 rounded-sm">Medium</p>
          </div>
          <div className="bg-white text-black rounded-sm p-2 shadow-xl flex flex-col gap-1">
            <p className="font-bold">Lorem ipsum dolor sit</p>
            <p className="opacity-75">January 15, 2025</p>
            <p className="bg-red-300 w-min px-2 rounded-sm">Medium</p>
          </div>
          <div className="bg-white text-black rounded-sm p-2 shadow-xl flex flex-col gap-1">
            <p className="font-bold">Lorem ipsum dolor sit</p>
            <p className="opacity-75">January 15, 2025</p>
            <p className="bg-red-300 w-min px-2 rounded-sm">Medium</p>
          </div>
        </div>
        <div className="bg-done p-2 pb-3 rounded-md flex flex-col gap-3">
          <div className="flex gap-4">
            <div className="rounded-2xl bg-gray-400 px-2 flex items-center justify-center gap-1">
              <FontAwesomeIcon icon={faCircle} className="text-tiny" />
              To-Do
            </div>
            <p>5</p>
          </div>
          <div className="bg-white text-black rounded-sm p-2 shadow-xl flex flex-col gap-1">
            <p className="font-bold">Lorem ipsum dolor sit</p>
            <p className="opacity-75">January 15, 2025</p>
            <p className="bg-red-300 w-min px-2 rounded-sm">Medium</p>
          </div>
          <div className="bg-white text-black rounded-sm p-2 shadow-xl flex flex-col gap-1">
            <p className="font-bold">Lorem ipsum dolor sit</p>
            <p className="opacity-75">January 15, 2025</p>
            <p className="bg-red-300 w-min px-2 rounded-sm">Medium</p>
          </div>
          <div className="bg-white text-black rounded-sm p-2 shadow-xl flex flex-col gap-1">
            <p className="font-bold">Lorem ipsum dolor sit</p>
            <p className="opacity-75">January 15, 2025</p>
            <p className="bg-red-300 w-min px-2 rounded-sm">Medium</p>
          </div>
        </div>
      </section>
    </>
  )
}