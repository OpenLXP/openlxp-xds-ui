import logo from "../../resources/internal/dodLogo.png";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../common/button/buttons";
import { SearchField } from "../common/input/inputs";

import { useState } from "react";

import { logoutUser } from "../../store/user";
import { removeLists } from "../../store/lists";
import UserMenu from "./Menu/UserMenu";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Handles the state of the search bar query
  const [query, setQuery] = useState("");

  const userMenuItems = [
    {
      title: "Logout",
      url: "/",
      icon: "",
      func: () => {
        dispatch(logoutUser(user));
        dispatch(removeLists());
      },
    },
    { title: "Profile", url: "/", icon: "" },
    {
      title: "Search Interest Lists",
      url: "/searchinterestlists",
      icon: "",
      func: () => {
        history.push("/searchinterestlists");
      },
    },
    {
      title: "Saved Search",
      url: "/saved-searches",
      icon: "",
      func: () => {
        history.push("/saved-searches");
      },
    },
    {
      title: "Manage Subscriptions",
      url: "/",
      icon: "",
      func: () => {
        history.push("/managesubscriptions");
      },
    },
    {
      title: "Manage Interests",
      url: "/",
      icon: "",
      func: () => {
        history.push("/manageinterestlists");
      },
    },
    {
      title: "Filter Search",
      url: "/",
      icon: "",
      func: () => {
        history.push({
          pathname: "/filter-search",
          search:
            "Course.CourseProviderName=&Course.CourseTitle=&CourseInstance.CourseLevel=&p=1",
        });
      },
    },
    { title: "Favorites", url: "/", icon: "" },
  ];

  // Sends user to home page
  const handleDodButton = () => {
    history.push("/");
  };

  // Handles the submition of a query
  const handleSearch = () => {
    history.push({
      pathname: "/search/",
      search: `?keyword=${query}&p=1`,
    });
    setQuery("");
  };

  // submits the search term on enter
  const handleEnterKey = (event) => {
    if (event.key === "Enter" || event.key === 13) {
      handleSearch();
    }
  };

  // Handles the state of the button
  const handleSignInSignUpButton = () => {
    history.push("/signin");
  };

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="bg-header-img bg-no-repeat bg-cover px-4 md:px-24 lg:px-32  xl:px-56">
      <div className="flex flex-row justify-between items-center">
        <div
          className="flex flex-row my-1 rounded-md space-x-2 items-center cursor-pointer hover:bg-gray-300 hover:bg-opacity-20 transition-colors duration-300 ease-in-out"
          onClick={handleDodButton}>
          <img src={logo} alt="" className="" />
          <div>
            <div className="text-base -my-1 text-base-blue font-semibold font-serif ">
              DIGITAL LEARNING PORTAL
            </div>
            <div className="text-xs text-dark-blue font-serif font-normal">
              U.S. Department of Defense
            </div>
          </div>
        </div>
        <div className="flex md:flex-row gap-2">
          <SearchField
            placeholder="Search"
            onKeyPress={handleEnterKey}
            onClick={handleSearch}
            onChange={handleQuery}
            value={query}
          />
          {user ? (
            <UserMenu username={user.email} menuItems={userMenuItems} />
          ) : (
            <Button onClick={handleSignInSignUpButton} fontWeight="thin">
              Sign in
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
