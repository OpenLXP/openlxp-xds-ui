import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function InterestGroupPopup() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  let IntrestList = [
    {name: "Interest List 1"}, 
    {name:"Interest List 2"}, 
    {name: "Interest List 3"}
  ]

  const makeInterestListCheckboxes = IntrestList.map((interstList, index) => {
    return (
      <div key={index}>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox"/>
          <span class="ml-2">{interstList.name}</span>
        </label>
      </div>
    );
  });

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="ml- bg-white text-base-blue font-bold underline py-2 px-4 rounded hover:bg-blue-300 hover:bg-opacity-50 transition-colors duration-300 ease-in-out" 
          >
          Add to List
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-8 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h1"
                  className="py-4 text-lg font-bold leading-6 text-black text-middle border-b-2 border-b-black"
                >
                  Add Courses to Interest List(s)
                </Dialog.Title>

                <div className="mt-2">
                  <p className="py-4 text-md text-black text-middle">
                    {makeInterestListCheckboxes}
                  </p>
                </div>

                <div className="mt-2">
                  <p className="text-lg text-light-blue underline text-middle">
                    Create new interest list
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
