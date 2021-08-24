import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Error, Loading } from "../components/common/messages/messages";
import { Title } from "../components/common/text/text";

import { getUserLists } from "../store/lists";
import PageWrapper from "../components/common/PageWrapper";
import InterestList from "../components/ManageInterestListsPage/InterestList";

export default function ManageInterestLists() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const { lists, status } = useSelector((state) => state.lists);

  // handles the state of the lists
  useEffect(() => {
    // updates the redux state with an array of lists.
    dispatch(getUserLists(user?.token));
  }, [user.token]);

  return (
    <PageWrapper className={"my-5 bg-body-gray"}>
      <Title title={"Manage Interest Lists"} />
      <div className="my-2 p-2 rounded-md bg-white">
        {status === "loading" && <Loading />}
        {status === "failed" && (
          <Error error={"Contact a system administrator."} />
        )}
        {status === "succeeded" &&
          lists?.map((list) => <InterestList list={list} />)}
      </div>
    </PageWrapper>
  );
}
