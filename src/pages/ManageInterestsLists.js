import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Error, Loading} from "src/components/common/messages/messages";
import {Title} from "src/components/common/text/text";

import {getUserLists} from "../store/lists"
import PageWrapper from "../components/common/PageWrapper";
import InterestList
  from "../components/ManageInterestLists/InterestList/InterestList";

const ManageInterestLists = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const { lists, status } = useSelector((state) => state.lists);

  // handles the initial load if a user does not exist
  useEffect(() => {
    if (!user) history.push("/signin");
  }, [user]);

  // handles the state of the lists
  useEffect(() => {
    // updates the redux state with an array of lists.
    dispatch(getUserLists(user?.token));
  }, [dispatch, user.token]);

  return (
    <PageWrapper className={"my-5 bg-body-gray"}>
      <Title title={"Manage Interest Lists"}/>
      <div className="my-2 p-2 rounded-md bg-white">
        {status === "succeeded" && lists?.map((list) => {
          return <InterestList list={list}/>;
        })}
        {status === "loading" && <Loading/>}
        {status === "rejected" &&
        <Error error={"Contact a system administrator."}/>}
      </div>
    </PageWrapper>
  );
};

export default ManageInterestLists;
