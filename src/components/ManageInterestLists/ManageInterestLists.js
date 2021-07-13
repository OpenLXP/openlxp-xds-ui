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
  const [userLists, setUserLists] = useState([]);
  const [subscribedLists, setSubscribedLists] = useState([]);

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

      if (lists.status === "succeeded") {
        setUserLists(lists.lists?.user || []);
        setSubscribedLists(lists.lists?.subscribed || []);
      }
    }

    // Re-render if user state changes or if list state changes
  }, [lists?.lists, user?.user]);

  // Generating Interest Lists from the user data saved on backend
  // TODO: Move this to its own component

  return (
    <PageWrapper className="bg-body-gray mb-8 ">
      {user ? (
        <>
          <h1 className="font-semibold font-sans text-3xl my-4">
            Manage Interest Lists
          </h1>
          <div className="bg-white rounded-md px-4 pb-8">
            <h2 className="font-semibold font-sans text-xl py-3">My Lists</h2>
            <div className="space-y-6">
              {userLists.map((list) => {
                return <InterestLists list={list} />;
              })}
            </div>
          </div>
          <div className="bg-white rounded-md px-4 pb-8 my-4">
            <h2 className="font-semibold font-sans text-xl py-3">
              Subscibed Lists
            </h2>
            <div className="space-y-6">
              {subscribedLists.map((list) => {
                return <SubscribedLists list={list} />;
              })}
            </div>
          </div>
        </>
      ) : null}
    </PageWrapper>
  );
};
export default ManageInterestLists;
