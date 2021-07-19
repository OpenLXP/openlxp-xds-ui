import PageWrapper from "../common/PageWrapper";
import { Disclosure } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

import { getLists } from "../../store/lists";
import InterestLists from "./InterestLists/InterestLists";
import SubscribedLists from "./SubscribedLists/SubscribedLists";

const ManageInterestLists = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, lists } = useSelector((state) => state);

  // states for individual lists
  const [currentLists, setCurrentLists] = useState(null);

  let mainContent = (
    <>
      <div className="bg-white rounded-md px-4 pb-8 my-4">
        <h2 className="font-semibold font-sans text-xl py-3">My Lists</h2>
        <div className="space-y-6">
          {currentLists?.user.map((list) => {
            return <InterestLists list={list} />;
          })}
        </div>
      </div>
      <div className="bg-white rounded-md px-4 pb-8 my-4">
        <h2 className="font-semibold font-sans text-xl py-3">
          Subscibed Lists
        </h2>
        <div className="space-y-6">
          {currentLists?.subscribed.map((list) => {
            return <SubscribedLists list={list} />;
          })}
        </div>
      </div>
    </>
  );

  let loadingContent = (
    <>
      <div className="w-full bg-white rounded-md px-4 pb-4 py-3 my-4 animate-pulse space-y-2">
        <div className="rounded-md h-8 w-36 bg-opacity-30 bg-light-blue" />
        <div className="border border-light-blue border-opacity-50 rounded-md pl-1 pr-4 py-1">
          <div className="flex flex-row justify-between items-center text-light-blue my-2 text-opacity-50">
            <div className="rounded-md h-8 w-56 bg-opacity-30 bg-light-blue" />
            <ion-icon name="chevron-down-outline" />
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="w-36 h-8 rounded-md my-2 bg-opacity-30 bg-light-blue"></div>
            <div className="w-16 h-8 rounded-md my-2 bg-opacity-30 bg-light-blue"></div>
          </div>
          <div className="w-full h-36 rounded-md my-2 bg-light-blue bg-opacity-30"></div>
        </div>
      </div>
      <div className="w-full bg-white rounded-md px-4 pb-4 py-3 my-4 animate-pulse space-y-2">
        <div className="rounded-md h-8 w-36 bg-opacity-30 bg-light-blue" />
        <div className="border border-light-blue border-opacity-50 rounded-md pl-1 pr-4 py-1">
          <div className="flex flex-row justify-between items-center text-light-blue my-2 text-opacity-50">
            <div className="rounded-md h-8 w-56 bg-opacity-30 bg-light-blue" />
            <ion-icon name="chevron-down-outline" />
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="w-36 h-8 rounded-md my-2 bg-opacity-30 bg-light-blue"></div>
            <div className="w-16 h-8 rounded-md my-2 bg-opacity-30 bg-light-blue"></div>
          </div>
          <div className="w-full h-36 rounded-md my-2 bg-light-blue bg-opacity-30"></div>
        </div>
      </div>
    </>
  );

  useEffect(() => {
    // if the user is not logged in redirect to login
    if (!user.user) {
      history.push("/signin");
    }

    // if the user profile is present
    if (user?.user && user.status === "succeeded") {
      console.log(lists);
      if (!lists?.lists) {
        dispatch(getLists());
      }

      setTimeout(() => {
        if (lists.status === "succeeded") {
          setCurrentLists(lists?.lists);
        }
      }, 2000);
    }

    // Re-render if user state changes or if list state changes
  }, [lists?.status, user?.user]);

  // Generating Interest Lists from the user data saved on backend
  // TODO: Move this to its own component

  return (
    <PageWrapper className="bg-body-gray mb-8 ">
      {user ? (
        <>
          <h1 className="font-semibold font-sans text-3xl my-4">
            Manage Interest Lists
          </h1>

          {currentLists?.user || currentLists?.subscribed
            ? mainContent
            : loadingContent}
        </>
      ) : null}
    </PageWrapper>
  );
};
export default ManageInterestLists;
