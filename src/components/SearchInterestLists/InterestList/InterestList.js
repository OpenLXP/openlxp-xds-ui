import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function InterestList({ title, owner, description, id }) {
  const { user } = useSelector((state) => state.user);
  const [subscribed, setSubscribed] = useState(false);


  const handleSubscribe = () => {
    const url = `${process.env.REACT_APP_INTEREST_LISTS_ALL}${id}/subscribe`;
    let header = {
      Authorization: "Token " + user.token,
    };

    axios
      .patch(url, {}, { headers: header })
      .then((res) => {
        setSubscribed(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUnsubscribe = () => {
    const url = `${process.env.REACT_APP_INTEREST_LISTS_ALL}${id}/unsubscribe`;
    let header = {
      Authorization: "Token " + user.token,
    };

    axios
      .patch(url, {}, { headers: header })
      .then((res) => {
        setSubscribed(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full flex flex-row justify-between px-2 p-2 border shadow-sm rounded-md items-center hover:shadow-md transition-shadow duration-100">
      <div className="font-sans">
        <div className="font-semibold text-lg line-clamp-1">{title}</div>
        <div className="text-sm">{owner.email}</div>
      </div>

      <div>
        {!subscribed && (
          <div
            onClick={handleSubscribe}
            className="select-none bg-green-100 text-green-700 hover:bg-green-700 hover:text-white transition-color duration-200 cursor-pointer rounded-md px-2">
            Subscribe
          </div>
        )}
        {subscribed && (
          <div
            onClick={handleUnsubscribe}
            className="select-none bg-red-100 text-red-700 hover:bg-red-700 hover:text-white transition-color duration-200 cursor-pointer rounded-md px-2">
            Unsubscribe
          </div>
        )}
      </div>
    </div>
  );
}
