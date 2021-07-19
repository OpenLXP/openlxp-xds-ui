import { useState } from "react";

import InterestLists from "../InterestLists/InterestLists";
import SubscribedLists from "../SubscribedLists/SubscribedLists";

const InterestListsTabs = (props) => {
  // Tab state
  const [tabs, setTabs] = useState([
    { name: "My List", isActive: true },
    { name: "Subscribed Lists", isActive: false },
  ]);

  const handleTabChange = (event) => {
    setTabs(
      tabs.map((tab) => {
        if (tab.name === event.target.innerHTML) {
          return { name: tab.name, isActive: true };
        }

        return { name: tab.name, isActive: false };
      })
    );
  };

  const tabButtons = tabs.map((tab) => {
    return (
      <div
        className={`${
          tab.isActive ? "text-white bg-base-blue" : ""
        } px-2 py-1 transition transition-all duration-500 ease-in-out  rounded-t-md`}
        onClick={handleTabChange}
      >
        {tab.name}
      </div>
    );
  });

  // Div state
  let userLists = (
    <div className="bg-white rounded-b-md p-4">
      <div className="space-y-6">
        {props.currentLists?.user.map((list) => {
          return <InterestLists list={list} />;
        })}
      </div>
    </div>
  );

  let subscribedLists = (
    <div className="bg-white rounded-b-md p-4">
      <div className="space-y-6">
        {props.currentLists?.subscribed.map((list) => {
          return <SubscribedLists list={list} />;
        })}
      </div>
    </div>
  );

  // skeleton loader?

  // content
  return (
    <div>
      <div className="flex flex-row border-b border-gray-200 space-x-4 font-sans text-lg font-semibold select-none cursor-pointer">
        {tabButtons}
      </div>

      <div>
        {tabs.find((tab) => tab.isActive).name === "My List"
          ? userLists
          : subscribedLists}
      </div>
    </div>
  );
};

export default InterestListsTabs;
