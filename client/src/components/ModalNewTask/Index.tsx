import Modal from 'react-modal';
import type { ModalNewTaskInterface } from "../../interfaces/ModalNewTask"; 
import { faCalendarDay, faCircleExclamation, faMessage, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UseTask } from '../../hooks/UseTask';
import { UseNewTask } from '../../hooks/UseNewTask';

export function ModalNewTask({ isOpen, onRequestClose }: ModalNewTaskInterface) {
  const { status, priorities } = UseTask()
  const { 
    task,
		setTask,
		selectPriority,
		setSelectPriority,
		deadline,
		setDeadline,
		selectStatus,
		setSelectStatus,
		comment,
		setComment,
		handleClick
  } = UseNewTask()

  return (
    <Modal
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      className="w-full h-full max-w-mobile-modal max-h-fit p-8 relative rounded-md overflow-y-auto sm:max-w-96 2xl:max-h-full 2xl:max-w-modal 2xl:p-16"
      overlayClassName="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center 2xl:justify-end"
      id='modalNew'
    >
      <div className='flex justify-between mb-6'>
        {/* biome-ignore lint/a11y/noAutofocus: <explanation> */}
        <input autoFocus type="text" className="w-full text-lg py-1 px-2 rounded outline-0" value={task} onChange={(e) => setTask(e.target.value)} required/>
        <button 
          id='closeModal' 
          type="button" 
          className="border-0 bg-close-modal hover:brightness-75 duration-300" 
          onClick={onRequestClose}
        >
          <FontAwesomeIcon icon={faXmark} size="2xl" />        
        </button>
      </div>
      <form action="" className="flex flex-col gap-5 pl-2">
        <div className="flex flex-row gap-2 items-center justify-between">
          <label htmlFor="expedicao" className='flex items-center gap-1'>
            <FontAwesomeIcon icon={faCircleExclamation} size='sm'/>
            Priority
          </label>
          <select 
            className='w-input-modal py-1 px-2 rounded duration-300 input-color' 
            value={selectPriority} 
            onChange={(e) => setSelectPriority(e.target.value)}
            required
          >
            <option value={""} disabled>&nbsp;</option>
            {priorities.map(priority => (
              <option value={priority.id} key={priority.id}>{priority.title}</option>
            ))}
          </select>
        </div> 

        <div className="flex flex-row gap-2 items-center justify-between">
          <label htmlFor="expedicao" className='flex items-center gap-1'>
            <FontAwesomeIcon icon={faCalendarDay} size="sm" />
            Deadline
          </label>
          <input 
            type="date" 
            className="w-input-modal py-1 px-2 rounded duration-300 input-color" 
            value={deadline} 
            onChange={(e) => setDeadline(e.target.value)} 
            required
          />
        </div> 

        <div className="flex flex-row gap-2 items-center justify-between">
          <label htmlFor="expedicao" className='flex items-center gap-1'>
           <FontAwesomeIcon icon={faSpinner} size="sm" />
            Status
          </label>
          <select 
            className='w-input-modal py-1 px-2 rounded duration-300 input-color' 
            value={selectStatus} 
            onChange={(e) => setSelectStatus(e.target.value)}
            required
          >
            <option value={""} disabled>&nbsp;</option>
            {status.map(element => (
              <option value={element.id} key={element.id}>{element.title}</option>
            ))}
          </select>
        </div> 

        <div className="flex flex-row gap-2 items-baseline justify-between">
          <label htmlFor="expedicao" className='flex items-center gap-1'>
           <FontAwesomeIcon icon={faMessage} size="sm" />
            Comment
          </label>
          <input type="text" className='w-input-modal py-1 px-2 rounded duration-300 input-color resize-none' onChange={(e) => setComment(e.target.value)} value={comment} required />
        </div> 

        <div className="flex flex-row justify-end gap-5">
          <button 
            type="submit" 
            className="font-bold px-3 py-2 rounded w-1/4 hover:brightness-75 duration-300" 
            onClick={handleClick}
          >
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  )
}