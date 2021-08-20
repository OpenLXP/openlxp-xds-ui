import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSubscribedLists } from "../../store/lists";

import PageWrapper from "../common/PageWrapper";
import SubscriptionList from "./SubscriptionList/SubscriptionLists";

export default function ManageSubscriptions() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { subs } = useSelector((state) => state.lists);

  const [subscribed, setSubscribed] = useState({
    isLoading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    if (user) {
      dispatch(getSubscribedLists(user.token));
    } else {
      history.push("/signin");
    }
  }, [user] );
  
  
  return (
    <PageWrapper className={"my-5 bg-body-gray"}>
      <h2 className="text-3xl">Subscribed Lists</h2>
      <div className="my-2 rounded-md bg-white flex flex-col gap-4 p-4">
        {subs?.map((list) => {
          return (
            <SubscriptionList list={list} token={user.token} key={list.id} />
          );
        })}
      </div>
    </PageWrapper>
  );
}
