import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Disclosure, Transition } from "@headlessui/react";

const InterestLists = (props) => {
  const [list, setList] = useState({});
  const [isEditing, setEditing] = useState(false);

  // sets the editing state of the list
  const handleEdit = () => {
    // What to do on the click of update
    if (isEditing) {
      console.log("Update this list", list);
      // Make a [POST or PATCH] request to update the list
      // Update the user from the response
    }
    setEditing(!isEditing);
  };

  // updates the current attribute being edited
  const handleChange = (event, key) => {
    setList({ ...list, [key]: event.target.value });
  };

  // handles the removal of a list from the backend
  const handleDelete = () => {
    console.log("Delete this list", list);
    // Make a [DELETE] request to delete the entire list
    // update the user from the response
  };

  // handles the removal of a course from the backend
  const removeCourse = (key) => {
    setList({
      ...list,
      courses: list.courses.filter((course) => course.id !== key),
    });
  };

  useEffect(() => {
    setList(props.list);
  }, []);

  // Creates the list of courses in the list
  const ListTable = (list) => {
    let courses = list.courses || [];
    return (
      <div className="overflow-hidden border sm:rounded-lg">
        <table className="divide-y divide-gray-200 w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Provider
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Remove</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => {
              return (
                <tr className={`${index % 2 === 0 ? null : "bg-gray-50"}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.provider}
                  </td>
                  <td className="w-24">
                    {isEditing ? (
                      <div
                        className=" px-2 py-1 cursor-pointer hover:bg-red-200 transition duration-300 text-red-600 text-center rounded-md"
                        onClick={() => removeCourse(course.id)}
                      >
                        Remove
                      </div>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <Disclosure key={list.id}>
      {({ open }) => (
        <div className={`${open ? "shadow-lg" : "border"} rounded-md`}>
          <Disclosure.Button className="flex felx-row rounded-md w-full text-left text-xl font-sans py-2 px-4 justify-between items-center outline-none">
            {list.title}
            <ion-icon
              name={open ? "chevron-up-outline" : "chevron-down-outline"}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 py-2">
            <Transition
              show={open}
              enter="transition-all transition-opacity duration-300"
              enterFrom="opacity-10"
              enterTo="opacity-100"
              leave="transition-all transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="flex flex-row justify-end items-center space-x-2">
                <div
                  onClick={handleEdit}
                  className="cursor-pointer px-2 py-1 border rounded-md hover:shadow-sm transition-all duration-300 ease-in-out select-none items-center"
                >
                  {isEditing ? "Update" : "Edit"}
                </div>
                {isEditing ? (
                  <div
                    className="cursor-pointer px-2 py-1 rounded-md  transition-all duration-300 ease-in-out select-none items-center hover:shadow-sm bg-red-200 text-red-600 "
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                ) : null}
              </div>
              <div className="mt-4 text-gray-900">
                {isEditing ? (
                  <>
                    <h3 className="tracking-wider">Title</h3>
                    <input
                      disabled={!isEditing}
                      className="cols-span-1 w-full border rounded-md px-2 py-1 outline-none focus:ring-base-blue focus:ring-2 focus:ring-opacity-80 "
                      placeholder={list.title}
                      onFocus={(e) => {
                        e.target.value = list.title;
                      }}
                      onChange={(event) => {
                        handleChange(event, "title");
                      }}
                    />
                  </>
                ) : null}
                <h3 className="tracking-wider">Description</h3>
                <textarea
                  disabled={!isEditing}
                  name="description"
                  placeholder={list.description}
                  className="w-full border rounded-md px-2 py-1 outline-none focus:ring-base-blue focus:ring-2 focus:ring-opacity-80"
                  rows="3"
                  name="description"
                  onFocus={(e) => {
                    e.target.value = list.description;
                  }}
                  onChange={(event) => {
                    handleChange(event, "description");
                  }}
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h3 className="tracking-wider">Owner</h3>
                    <input
                      disabled={!isEditing}
                      className="cols-span-1 w-full border rounded-md px-2 py-1 outline-none focus:ring-base-blue focus:ring-2 focus:ring-opacity-80"
                      placeholder={list.owner}
                      onFocus={(e) => {
                        e.target.value = list.owner;
                      }}
                      onChange={(event) => {
                        handleChange(event, "owner");
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="tracking-wider">Updated</h3>
                    <input
                      disabled
                      className="cols-span-1 w-full border rounded-md px-2 py-1 outline-none focus:ring-base-blue focus:ring-2 focus:ring-opacity-80"
                      placeholder={list.updated}
                      onFocus={(e) => {
                        e.target.value = list.updated;
                      }}
                      onChange={(event) => {
                        handleChange(event, "updated");
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4">{ListTable(list)}</div>
              </div>
            </Transition>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default InterestLists;
