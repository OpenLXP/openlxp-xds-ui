import logo from "../../resources/internal/dodLogo.png";
import { useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/user";
import { useState, useEffect } from "react";

const Header = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    // Controls the state of the login button
    const [button, setButton] = useState({ url: "/signin", title: "Sign in" });

    // Handles the state of the search bar query
    const [query, setQuery] = useState("");

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
    };

    // submits the search term on enter
    const handleEnterKey = (event) => {
        if (event.key === "Enter" || event.key === 13) handleSearch();
    };

    // Handles the state of the button
    const handleSignInSignUpButton = () => {
        if (button.title === "Sign out") {
            dispatch(logoutUser(user));
            setButton({ url: "/signin", title: "Sign in" });
        }

        history.push("/signin");
    };

    // Update the button on re-render
    useEffect(() => {
        // if the use is logged in
        setButton({ url: "/signin", title: "Sign in" });
        if (user) {
            setButton({ url: "/", title: "Sign out" });
        }
    }, [user]);

    return (
        <div className="bg-header-img bg-no-repeat bg-cover px-32">
            <div className="flex flex-row justify-between items-center">
                <div
                    className="flex flex-row my-1 px-2 rounded-md space-x-2 items-center cursor-pointer hover:bg-gray-300 hover:bg-opacity-20 transition-colors duration-300 ease-in-out"
                    onClick={handleDodButton}
                >
                    <img src={logo} alt="" className="" />
                    <div>
                        <div className="text-lg text-base-blue font-medium">
                            Digital Learning Portal
                        </div>
                        <div className="text-sm text-dark-blue font-sans font-normal ">
                            U.S. Department of Defense
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-right">
                    <div className="flex flex-row space-x-2">
                        <div className="flex flex-row bg-white items-center appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm sm:text-sm">
                            <ion-icon
                                name="search-outline"
                                onClick={handleSearch}
                            />
                            <input
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleEnterKey}
                                className="ml-1 pl-1 focus:outline-none placeholder-gray-400 hover:shadow-sm"
                                placeholder="Search"
                            />
                        </div>
                        <div
                            className="py-1 px-2 shadow-sm text-white bg-base-blue rounded-md cursor-pointer whitespace-nowrap text-base font-medium hover:bg-dark-blue hover:bg-opacity-90 transition-colors duration-300 ease-in-out"
                            onClick={handleSignInSignUpButton}
                        >
                            {button.title}
                        </div>
                    </div>
                    <div className="text-right">{user ? user.email : null}</div>
                </div>
            </div>
        </div>
    );
};

export default Header;
