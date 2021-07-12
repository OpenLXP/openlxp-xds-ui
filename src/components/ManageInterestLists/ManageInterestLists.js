import PageWrapper from "../common/PageWrapper";
import { Disclosure } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

import InterestListTable from "./InterestListTable/InterestListTable";
import InterestListInformation from "./InterestListInformation/InterestListInformation";

const ManageInterestLists = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [lists, setLists] = useState([]);
  const TestLists = [
    {
      title: "Maths",
      id: 1,
      owner: "John Doe",
      updated: "1/12/2022",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iste assumenda nulla voluptas provident voluptatibus ratione deserunt tempora pariatur perferendis ullam praesentium asperiores hic officia, qui illum commodi laboriosam, labore?",
      courses: [
        {
          title: "Calculus 1A",
          provider: "Han Solo",
          id: "1",
        },
        {
          title: "Calculus 1B",
          provider: "C3P0",
          id: "2",
        },
        {
          title: "Calculus 1C",
          provider: "Chewbacca",
          id: "3",
        },
        {
          title: "Calculus 1E",
          provider: "Yoda",
          id: "4",
        },
      ],
    },
    {
      title: "Data List",
      id: 2,
      owner: "John Doe",
      updated: "1/12/2022",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iste assumenda nulla voluptas provident voluptatibus ratione deserunt tempora pariatur perferendis ullam praesentium asperiores hic officia, qui illum commodi laboriosam, labore? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta cupiditate aperiam expedita aliquid nisi illum eligendi deleniti at ipsam, ratione rem molestiae sit officia repellat dolore dolor voluptate consequuntur hic.",
      courses: [
        {
          title: "Data and the world around you",
          provider: "Yoda",
          id: "5",
        },
        {
          title: "Informed decision making using data analytics",
          provider: "Yoda of dagoba",
          id: "6",
        },
      ],
    },
  ];

  // Handles the removal a list
  const handleDeletingList = (key) => {
    setLists(
      lists.filter((list) => {
        return list.id !== key;
      })
    );
  };

  // Handles the removal of a course from a specific list
  const handleRemovingCourse = (key) => {
    const newList = lists.map((list, index, array) => {
      list.courses = list.courses.filter((course) => {
        return course.id !== key;
      });
      return list;
    });

    setLists(newList);
  };
  const handleAddingCourse = () => {
    // hit the api backend for a specific course code
  };

  useEffect(() => {
    // if the user is not logged in redirect to login
    if (!user) {
      history.push("/signin");
    }
    setLists(TestLists);
  }, user);

  // Generating Interest Lists from the user data saved on backend
  const makeLists = lists.map((list) => {
    return (
      <Disclosure key={list.id}>
        {({ open }) => (
          <div className={`${open ? "shadow-lg" : "border"} rounded-md`}>
            <Disclosure.Button
              className={`flex flex-row rounded-md w-full py-2 px-5 text-left bg-white items-center justify-between my-2`}
            >
              <div className="flex flex-row items-center space-x-2">
                <h3 className="tracking-wider text-lg">{list.title}</h3>
              </div>
              <ion-icon
                name={open ? "chevron-up-outline" : "chevron-down-outline"}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-900 rounded-b-md py-2 px-2 transform -translate-y-0.5">
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
                  <div className="px-2 py-1 border rounded-md hover:shadow-sm transition duration-200 ease-in-out cursor-pointer">
                    Edit
                  </div>
                  <div
                    className="px-2 py-1 bg-red-100 text-red-600 rounded-md hover:shadow-sm transition duration-200 ease-in-out cursor-pointer"
                    onClick={() => handleDeletingList(list.id)}
                  >
                    Delete
                  </div>
                </div>
                <InterestListInformation
                  info={{
                    description: list.description,
                    owner: list.owner,
                    updated: list.updated,
                  }}
                />

                <InterestListTable
                  courses={list.courses}
                  handleRemovingCourse={handleRemovingCourse}
                />
                <div className="rounded-b-full rounded-t-sm mt-1 p-1 pt-2 hover:shadow-lg max-w-max max-h-max flex items-center justify-center text-3xl text-gray-300 hover:text-gray-500 mx-auto transition duration-300 transform hover:scale-110 ease-in-out cursor-pointer">
                  <ion-icon name='add-circle-outline'></ion-icon>
                </div>
              </Transition>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    );
  });

  return (
    <PageWrapper className="bg-body-gray mb-8 ">
      {user ? (
        <>
          <h1 className="font-semibold font-sans text-3xl my-4">
            Manage Interest Lists
          </h1>
          <div className="bg-white rounded-md px-4 pb-8">
            <h2 className="font-semibold font-sans text-xl py-3">My Lists</h2>
            <div className="space-y-8">{makeLists}</div>
          </div>
        </>
      ) : null}
    </PageWrapper>
  );
};
export default ManageInterestLists;
