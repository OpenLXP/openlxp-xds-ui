import { Disclosure } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

import { getLists } from "../../store/lists";
import PageWrapper from "../common/PageWrapper";
import InterestListsTabs from "./InterestListTabs/InterestListTabs";

const ManageInterestLists = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, lists } = useSelector((state) => state);
  // states for individual lists
  const [currentLists, setCurrentLists] = useState(null);

  let loadingContent = (
    <div className="animate-pulse">
      <div className="flex flex-row space-x-2 border-b border-light-blue border-opacity-50">
        <div className="h-8 w-24 bg-base-blue rounded-t-md bg-opacity-30"></div>
        <div className="h-8 w-24 bg-base-blue rounded-t-md bg-opacity-10"></div>
      </div>
      <div className="w-full bg-white rounded-b-md p-4 space-y-2">
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
    </div>
  );

  useEffect(() => {
    // if the user is not logged in redirect to login
    if (!user.user) {
      history.push("/signin");
    }

    // if the user profile is present
    if (user?.user && user.status === "succeeded") {
      if (!lists?.lists) {
        dispatch(getLists());
      }

      setTimeout(() => {
        if (lists.status === "succeeded") {
          setCurrentLists(lists?.lists);
        }
      }, 1500);
    }

    // Re-render if user state changes or if list state changes
  }, [lists?.status, user?.user]);

  // Generating Interest Lists from the user data saved on backend
  // TODO: Move this to its own component

  return (
    <PageWrapper className="bg-body-gray mb-8 ">
      <h1 className="font-semibold font-sans text-3xl my-4">
        Manage Interest Lists
      </h1>
      <div className="hidden">
        <div className="border-b">
          <div>My Lists</div>
          <div>Subscribed Lists</div>
        </div>
      </div>
      {currentLists?.user || currentLists?.subscribed ? (
        <InterestListsTabs currentLists={currentLists} />
      ) : (
        loadingContent
      )}
    </PageWrapper>
  );
};
export default ManageInterestLists;
