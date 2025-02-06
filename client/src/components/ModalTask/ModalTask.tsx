import Modal from 'react-modal';
import type { ModalTaskInterface } from "../../interfaces/ModalTask"; 
import { faCalendarDay, faCircleExclamation, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



// .react-modal-overlay {
//   background-color: rgba(0, 0, 0, 0.5);

//   position: fixed;
//   top: 0;
//   bottom: 0;
//   right: 0;
//   left: 0;

//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .react-modal-content {
//   width: 100%;
//   max-width: 800px;
//   max-height: 90vh;
//   background-color: rgb(55 65 81);
//   padding: 2rem;
//   position: relative;
//   border-radius: .25rem;
//   overflow-y: auto;
// }

// .react-modal-close {
//   position: absolute;
//   right: 1.5rem;
//   top: 1.5rem;
//   border: 0;
//   background-color: transparent;

//   transition: filter .2s;
// }

// .react-modal-close:hover {
//   filter: brightness(.8);
// }

export function ModalTask({ isOpen, onRequestClose }: ModalTaskInterface) {
  return (
    <Modal
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      className="w-full h-full max-w-96 max-h-80 bg-gray-800 p-8 relative rounded-md overflow-y-auto 2xl:max-h-full 2xl:max-w-modal 2xl:p-16"
      overlayClassName="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center 2xl:justify-end"
    >
      <div className='flex justify-between mb-6'>
        {/* <h1 className='text-2xl font-bold'>New Task</h1> */}
        <input type="text" className="w-full text-lg py-1 px-2 rounded hover:bg-engengrau duration-300 outline-0" value="New Task" autoFocus required/>
        <button id='closeModal' type="button" className="border-0 bg-close-modal hover:brightness-75 duration-300" onClick={onRequestClose}>
          <FontAwesomeIcon icon={faXmark} size="2xl" color="white" />        
        </button>
      </div>
      {/* <form action="" onSubmit={saveButton} className="flex flex-col gap-5"> */}
      <form action="" className="flex flex-col gap-5 pl-2">
        <div className="flex flex-row gap-2 items-center">
          <label htmlFor="expedicao" className='flex items-center gap-1'>
            <FontAwesomeIcon icon={faCircleExclamation} size='sm'/>
            Priority
          </label>
          <input type="text" className="w- text-lg py-1 px-2 rounded hover:bg-engengrau duration-300" required/>
        </div> 

        <div className="flex flex-row gap-2 items-center">
          <label htmlFor="expedicao" className='flex items-center gap-1'>
            <FontAwesomeIcon icon={faCalendarDay} size="sm" />
            Deadline
          </label>
          <input type="text" className="w-full text-lg py-1 px-2 rounded hover:bg-engengrau duration-300" required/>
        </div> 

        <div className="flex flex-row gap-2 items-center">
          <label htmlFor="expedicao" className='flex items-center gap-1'>
           <FontAwesomeIcon icon={faSpinner} size="sm" />
            Status
          </label>
          <input type="text" className="w-full text-lg py-1 px-2 rounded hover:bg-engengrau duration-300" required/>
        </div> 

        <div className="flex flex-row gap-2 items-center">
          <label htmlFor="expedicao" className='flex items-center gap-1'>
            <FontAwesomeIcon icon={faCircleExclamation} size='sm'/>
            Priority
          </label>
          <input type="text" className="w-full text-lg py-1 px-2 rounded hover:bg-engengrau duration-300" required/>
        </div> 

        <div className="flex flex-row gap-2 items-center">
          <label htmlFor="expedicao" className='flex items-center gap-1'>
            <FontAwesomeIcon icon={faCircleExclamation} size='sm'/>
            Priority
          </label>
          <input type="text" className="w-full text-lg py-1 px-2 rounded hover:bg-engengrau duration-300" required/>
        </div> 

        <div className="flex flex-row justify-end gap-5">
          <button type="submit" className="bg-green-600 font-bold px-3 py-2 rounded w-1/4 hover:brightness-90">Salvar</button>
        </div>
      </form>
    </Modal>
  )
}