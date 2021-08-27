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
  const { lists, status, error } = useSelector((state) => state.lists);
  // handles the state of the lists
  useEffect(() => {
    dispatch(getUserLists(user?.token));
  }, [user.token]);

  return (
    <PageWrapper className={"my-5 bg-body-gray"}>
      <Title title={"Manage Interest Lists"} />
      <div className="my-2 p-2 rounded-md bg-white">
        {status === "loading" && <Loading />}
        {status === "failed" && error && (
          <Error>{"Contact a system administrator."}</Error>
        )}
        {!error &&
          lists?.length > 0 &&
          lists?.map((list, index) => (
            <InterestList list={list} token={user.token} key={index} />
          ))}
      </div>
    </PageWrapper>
  );
}
