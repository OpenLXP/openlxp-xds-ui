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
      courses: listOfHashIds,
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
          setCourseList(response.data.courses);
        });
    }
  }, [list.courses]);

  return (
    <Disclosure>
      <Disclosure.Button className="w-full text-left">
        {list.name}
      </Disclosure.Button>
      <Disclosure.Panel className="py-2">
        <div>
          {(() => {
            if (isEditing) {
              return (
                <div className="flex flex-row justify-end space-x-2">
                  <div onClick={handleUpdate}>Update</div>
                  <div onClick={handleDeleteList}>Delete</div>
                </div>
              );
            }
            return (
              <div className="flex flex-row justify-end">
                <div onClick={handleEditing}>Editing</div>
              </div>
            );
          })()}
        </div>

        <div className="">
          <input
            type="text"
            placeholder={list.name}
            onFocus={(e) => (e.target.value = list.name)}
            onChange={(e) => handleInfoUpdate(e, "name")}
          />
          <div className="flex flex-row">
            <div className="w-full flex flex-col">
              <label htmlFor="">Owner</label>
              <input type="text" placeholder={list.owner.email} disabled />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="">Updated</label>
              <input
                type="text"
                placeholder={list.modified || list.created}
                disabled
              />
            </div>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="">Description</label>
            <input
              type="text"
              placeholder={list.description}
              disabled={!isEditing}
              onChange={(e) => handleInfoUpdate(e, "description")}
            />
          </div>

          <div className="flex">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="tracking-wider pl-2 pr-6 py-2 ">
                    Course Title
                  </th>
                  <th className="tracking-wider pl-2 pr-6 py-2">Provider</th>
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
                    <tr className={``}>
                      <td
                        className="max-w-xs line-clamp-1 pl-2 pr-6 pt-1"
                        title={courseData.CourseTitle}>
                        {courseData.CourseTitle}
                      </td>
                      <td className="px-2">{courseData.CourseProviderName}</td>

                      <td className=" text-red-600">
                        <div
                          onClick={() => handleRemoveCourse(courseHash)}
                          className="cursor-pointer p-1 rounded-md text-center hover:bg-red-200">
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
    </Disclosure>
  );
};
export default InterestList;
