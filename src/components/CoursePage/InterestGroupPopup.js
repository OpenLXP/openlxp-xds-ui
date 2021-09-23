import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourseToList, userAllLists } from "../../config/config";

import { getUserLists } from "../../store/lists";

const InterestGroupPopup = (props) => {
  const { lists } = useSelector((state) => state.lists);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // manages the state of the modal
  const [isOpen, setIsOpen] = useState(false);
  const [newListInfo, setNewListInfo] = useState({ description: "", name: "" });

  // manages the selected lists to update
  const [selectedLists, setSelectedLists] = useState([]);

  const handleSubmit = () => {
    const dataToSend = {
      lists: selectedLists,
    };
    const header = {
      Authorization: `Token ${user.token}`,
    };

    axios
      .post(
        `${addCourseToList}${props.courseId}/interest-lists`,
        dataToSend,
        {
          headers: header,
        }
      )
      .then((response) => {
        dispatch(getUserLists(user?.token));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleNewList = () => {
    const dataToSend = {
      description: newListInfo.description,
      name: newListInfo.name,
    };
    const header = {
      Authorization: `Token ${user.token}`,
    };
    axios
      .post(userAllLists, dataToSend, {
        headers: header,
      })
      .then((response) => {
        setNewListInfo({ description: "", name: "" });
        dispatch(getUserLists(user?.token));
      });
  };

  const handleSelect = (e, id) => {
    // if the list is not in the selections then add it
    if (selectedLists.filter((list) => list === id).length < 1) {
      const newList = selectedLists;
      newList.push(id);
      setSelectedLists(newList);
    }
    // remove it
    else if (!e.target.checked && e.target.checked !== undefined) {
      setSelectedLists(selectedLists.filter((list) => list !== id));
    }
  };
  useEffect(() => {
    dispatch(getUserLists(user?.token));

    return () => {};
  }, [user]);

  const groupButtons = () => {
    return lists?.map((list) => {
      const { name, id, experiences } = { ...list };
      return (
        <label
          key={id}
          className={`flex flex-row items-center space-x-2 cursor-pointer select-none shadow py-2 px-2 rounded-md hover:shadow-md transition-all duration-100 ease-in-out focus:bg-blue-200`}
          htmlFor={`group-${id}`}
          onClick={(e) => {
            handleSelect(e, id);
          }}>
          <input
            type="checkbox"
            className="cursor-pointer"
            name="select-group"
            id={`group-${id}`}
          />
          <div className="flex flex-row justify-between w-full">
            <div className="line-clamp-1">{name}</div>
            <div className="px-1.5 rounded-md bg-base-blue bg-opacity-10 text-base-blue">
              {experiences.length}
            </div>
          </div>
        </label>
      );
    });
  };
  return (
    <div>
      {user ? (
        <div
          className="mx-auto text-center cursor-pointer underline hover:text-base-blue"
          onClick={() => {
            setIsOpen(!isOpen);
          }}>
          Add to list
        </div>
      ) : null}
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />
        <div className="flex items-center justify-center h-full">
          <div className="transform bg-white p-2 rounded-md outline-none border-none w-96">
            <div className="flex flex-row justify-between border-b p-1">
              <Dialog.Title>Add to list</Dialog.Title>
              <button
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}>
                <ion-icon name="close-outline" data-testid="listTitle" />
              </button>
            </div>
            <div className="flex flex-col w-full space-y-2 mt-2 p-2 max-h-screen h-96 overflow-y-auto">
              <div className="flex flex-row justify-between py-2 items-center ">
                <button
                  className="bg-base-blue px-2 py-1 rounded-md text-white hover:bg-opacity-90"
                  onClick={handleSubmit}>
                  Add
                </button>
              </div>
              {groupButtons()}
            </div>
            <div className="border-2 border-dashed rounded-md flex flex-col items-left px-2 py-2 my=2 space-y-4">
              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-bright-blue focus-within:border-bright-blue">
                <label
                  htmlFor=""
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900 tracking-wider">
                  List Title
                </label>

                <input
                  value={newListInfo.name}
                  onChange={(e) => {
                    setNewListInfo({ ...newListInfo, name: e.target.value });
                  }}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                  type="text"
                  placeholder="New List Title"
                />
              </div>

              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-bright-blue focus-within:border-bright-blue">
                <label
                  htmlFor=""
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900 tracking-wider">
                  List Description
                </label>
                <textarea
                  value={newListInfo.description}
                  onChange={(e) => {
                    setNewListInfo({
                      ...newListInfo,
                      description: e.target.value,
                    });
                  }}
                  cols={"0"}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                  type="text"
                  placeholder="New List Description"
                />
              </div>

              <div>
                <button
                  className="bg-base-blue px-2 py-1 rounded-md text-white hover:bg-opacity-90"
                  onClick={handleNewList}>
                  Create New List
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default InterestGroupPopup;
