import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLists } from "../../../store/lists";
export default function InterestGroupPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [makingList, setMakingList] = useState(false);

  const dispatch = useDispatch();
  const { lists, user } = useSelector((state) => state);

  function closeModal() {
    setIsOpen(false);
    console.log(makingList);

  }

  function openModal() {
    setIsOpen(true);
    console.log(makingList);
  }

  useEffect(() => {
    if (user.user) {
      dispatch(getLists());
      console.log(makingList);

      if (lists?.lists) {
        setUserLists(lists.lists.user);
      }
    }
  }, [userLists]);

  const makeInterestListCheckboxes = userLists.map((list) => {
    return (
      <div class="cols-span-1 flex flex-row items-center border border-light-blue border-opacity-50 px-2 py-1 rounded-md select-none">
        <input
          type="checkbox"
          class="transform scale-150 checked:bg-blue-600 checked:border-transparent"
        />
        <span class="ml-2 tracking-wider">{list.title}</span>
      </div>
    );
  });

  const createNewInterestList = (
    <Transition
      show={makingList}
      enter="transition-all transition-opacity duration-300"
      enterFrom="opacity-10"
      enterTo="opacity-100"
      leave="transition-all transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="mt-4 text-gray-900 text-left">
        <h3 className="tracking-wider">Title</h3>
        <input className="cols-span-1 w-full border rounded-md px-2 py-1 outline-none focus:ring-base-blue focus:ring-2 focus:ring-opacity-80 " />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <h3 className="tracking-wider">Owner</h3>
            <input
              disabled
              className="cols-span-1 w-full border rounded-md px-2 py-1 outline-none focus:ring-base-blue focus:ring-2 focus:ring-opacity-80"
              value={user.user?.firstName + " " + user.user?.lastName}
            />
          </div>
          <div>
            <h3 className="tracking-wider">Updated</h3>
            <input
              disabled
              className="cols-span-1 w-full border rounded-md px-2 py-1 outline-none focus:ring-base-blue focus:ring-2 focus:ring-opacity-80"
            />
          </div>
        </div>
        <h3 className="tracking-wider">Description</h3>
        <textarea
          name="description"
          className="w-full border rounded-md px-2 py-1 outline-none focus:ring-base-blue focus:ring-2 focus:ring-opacity-80"
          rows="3"
        />
      </div>
    </Transition>
  );

  return (
    <>
      {user.user ? 
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="ml- bg-white text-base-blue font-bold underline py-2 px-4 rounded hover:bg-blue-300 hover:bg-opacity-50 transition-colors duration-300 ease-in-out"
        >
          Add to List
        </button>
      </div>
      : null}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-50"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
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
                  <p className="grid grid-cols-2 flex-wrap gap-2 py-4 text-md text-black text-middle">
                    {makeInterestListCheckboxes}
                  </p>
                </div>
                {makingList ? createNewInterestList : null}
                {makingList}
                <div
                  className="mt-2 text-lg text-light-blue underline text-middle cursor-pointer"
                  onClick={() => {
                    setMakingList(!makingList);
                    console.log(makingList);

                  }}
                >
                  Create new interest list
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
  );
}
