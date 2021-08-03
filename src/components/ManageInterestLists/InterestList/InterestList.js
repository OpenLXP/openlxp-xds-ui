import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUserLists } from "../../../store/lists";

const InterestList = (props) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [list, setList] = useState(props.list);
  const [courseList, setCourseList] = useState([]);
  const [isEditing, setEditing] = useState(false);

  const handleInfoUpdate = (event, key) => {
    setList({ ...list, [key]: event.target.value });
  };

  const handleUpdate = () => {
    const listOfHashIds =
      courseList?.map((course) => {
        return course.meta.metadata_key_hash;
      }) || [];
    const objToSend = {
      name: list.name,
      description: list.description,
      experiences: listOfHashIds,
    };

    axios
      .patch(`${process.env.REACT_APP_INTEREST_LISTS}${list.id}`, objToSend, {
        headers: {
          Authorization: "Token " + user.token,
        },
      })
      .then((response) => {
        dispatch(getUserLists());
      });

    // axios call
    // .then ( make list call update)
    // then re-render the courseList after new call

    // things to do for update
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(true);
  };
  // remove a course from the list
  const handleRemoveCourse = (hashId) => {
    console.log("test");
    const filteredCourses = courseList.filter(
      (course) => course.meta.metadata_key_hash !== hashId
    );

    setCourseList(filteredCourses);
  };

  // get the list id and remove it
  const handleDeleteList = () => {
    console.log("delete", list);
  };

  // Only re-render if courses is updated
  useEffect(() => {
    if (list.id) {
      axios
        .get(`${process.env.REACT_APP_INTEREST_LISTS}${list.id}`)
        .then((response) => {
          console.log(response.data)
          setCourseList(response.data.experiences);
        });
    }
  }, [list.courses]);

  return (
    <Disclosure>
      {({ open }) => (
        <div
          className={`${
            open ? "shadow-md" : "border"
          } px-4 py-2 rounded-md my-4`}>
          <Disclosure.Button className="w-full text-left flex flex-row items-center justify-between py-2">
            <div>{list.name}</div>
            {open ? (
              <ion-icon name="chevron-up-outline" />
            ) : (
              <ion-icon name="chevron-down-outline" />
            )}
          </Disclosure.Button>
          <Disclosure.Panel className="pb-2">
            <div>
              {(() => {
                if (isEditing) {
                  return (
                    <div className="flex flex-row justify-end space-x-2 mt-2 items-center">
                      <div
                        title="Close"
                        onClick={() => {
                          setEditing(false);
                          dispatch(getUserLists(user?.token));
                        }}
                        className="flex flex-row items-center space-x-2 bg-gray-200 text-gray-600 hover:bg-gray-400 hover:text-white rounded-md px-2 py-1 cursor-pointer transition-all duration-200 ease-in-out py-2 ">
                        <ion-icon name="arrow-undo-outline"></ion-icon>
                      </div>
                      <div
                        onClick={handleUpdate}
                        className="flex flex-row items-center space-x-2 bg-green-200 text-green-600 hover:outline-none hover:bg-green-600 hover:text-white rounded-md px-2 py-1 cursor-pointer transition-all duration-200 ease-in-out">
                        <ion-icon name="cloud-upload-outline"></ion-icon>
                        <div>Update</div>
                      </div>
                      <div
                        onClick={handleDeleteList}
                        className="flex flex-row items-center space-x-2 bg-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-md px-2 py-1 cursor-pointer transition-all duration-200 ease-in-out">
                        <ion-icon name="trash-outline" />
                        <div>Delete</div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="flex flex-row justify-end">
                    <div
                      onClick={handleEditing}
                      className="flex flex-row items-center space-x-2 bg-base-blue text-base-blue bg-opacity-20 hover:bg-base-blue hover:bg-opacity-100 hover:text-white rounded-md px-2 py-1 cursor-pointer transition-all duration-200 ease-in-out">
                      Edit
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="space-y-6 mt-2">
              {isEditing ? (
                <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:shadow-md focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                  <label
                    htmlFor="title"
                    className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900 tracking-wider">
                    Title
                  </label>
                  <input
                    type="text"
                    name="Title"
                    id="title"
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none"
                    placeholder={list.name}
                    onFocus={(e) => (e.target.value = list.name)}
                    onChange={(e) => handleInfoUpdate(e, "name")}
                  />
                </div>
              ) : null}
              <div className="flex flex-row space-x-2 select-none">
                <div className="w-full relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                  <label
                    htmlFor="name"
                    className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900">
                    Owner
                  </label>
                  <div
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm">
                    {list.owner.email}
                  </div>
                </div>
                <div className="w-full relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                  <label
                    htmlFor="name"
                    className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900">
                    Updated
                  </label>
                  <div
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm">
                    {list.modified || list.created}
                  </div>
                </div>
              </div>
              <div className="w-full relative border border-gray-300 rounded-md px-1 py-1 shadow-sm focus-within:shadow-md focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                <label
                  htmlFor="name"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900">
                  Updated
                </label>
                <textarea
                  disabled={!isEditing}
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm outline-none px-2 py-1 rounded"
                  placeholder={list.description}
                  onFocus={(e) => {
                    e.target.value = list.description;
                  }}
                />
              </div>

              <div className="flex border rounded-md border-gray-300">
                <table className="min-w-full overflow-hidden rounded-md ">
                  <thead className="bg-gray-100">
                    <tr className="text-left">
                      <th className="tracking-wider pl-2 pr-6 py-2 ">
                        Course Title
                      </th>
                      <th className="tracking-wider pl-2 pr-6 py-2">
                        Provider
                      </th>
                      <th className="relative pl-2 pr-6 py-2">
                        <span className="sr-only">remove</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {courseList?.map((course, index) => {
                      const courseData = { ...course.Metadata_Ledger.Course };
                      const courseHash = course.meta.metadata_key_hash;
                      return (
                        <tr
                          className={`${
                            index % 2 === 0 ? null : "bg-gray-50"
                          }`}>
                          <td
                            className="pl-2 pr-6 overflow-ellipsis overflow-hidden"
                            title={courseData.CourseTitle}>
                            {courseData.CourseTitle}
                          </td>
                          <td className="px-2">
                            {courseData.CourseProviderName}
                          </td>

                          <td className="text-red-600">
                            <div
                              data-testid="courseRemove"
                              onClick={() => handleRemoveCourse(courseHash)}
                              className={`${
                                isEditing ? "visible" : "invisible"
                              } cursor-pointer p-1 rounded-md text-center hover:bg-red-200 my-2 mr-2`}>
                              remove
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};
export default InterestList;
