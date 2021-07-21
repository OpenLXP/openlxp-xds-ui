import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getUserLists } from "../../store/lists";
import PageWrapper from "../common/PageWrapper";
import InterestList from "./InterestList/InterestList";

const ManageInterestLists = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, userStatus } = useSelector((state) => state.user);
  const { lists, listsStatus } = useSelector((state) => state.lists);
  
  // handles the intial load if a user does not exist
  useEffect(() => {
    if (!user) history.push("/signin");
  }, [user]);

  // handles the state of the lists
  useEffect(() => {
    // updates the redux state with an array of lists.
    dispatch(getUserLists(user?.token));
  }, []);

  return (
    <PageWrapper>
      <div className="space-y-8">
        {lists?.map((list) => {
          return <InterestList list={list} />;
        })}
      </div>
    </PageWrapper>
  );
};

export default ManageInterestLists;
