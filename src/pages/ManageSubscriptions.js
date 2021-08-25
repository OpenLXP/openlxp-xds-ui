import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Error, Loading } from "../components/common/messages/messages";
import { Title } from "../components/common/text/text";
import { getSubscribedLists } from "../store/lists";

import PageWrapper from "../components/common/PageWrapper";
import SubscriptionList from "../components/ManageSubscriptionsPage/SubscriptionLists";

const ManageSubscriptions = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { subs, status, error } = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(getSubscribedLists(user.token));
  }, [user]);

  return (
    <PageWrapper className={"my-5 bg-body-gray"}>
      <Title title={"Subscribed Lists"} />
      <div className="my-2 rounded-md bg-white flex flex-col gap-4 p-4">
        {status === "succeeded" &&
          subs?.map((list) => {
            return (
              <SubscriptionList list={list} token={user.token} key={list.id} />
            );
          })}
        {status === "loading" && <Loading />}
        {status === "failed" && (
          <Error>{"Contact a system administrator."}</Error>
        )}
      </div>
    </PageWrapper>
  );
};

export default ManageSubscriptions;
