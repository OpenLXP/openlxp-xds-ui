import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../store/user";
import InputEmail from "./Inputs/InputEmail";
import InputPassword from "./Inputs/InputPassword";

const SignIn = (props) => {
  const { user, status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [inputError, setInputError] = useState({
    username: null,
    password: null,
    loginError: null,
  });

  // tests for the password
  const testPassword = (password) => {
    if (password === "") return "This field is required";
    // No error
    return null;
  };

  // tests for the username
  const testUsername = (username) => {
    if (username === "") return "This field is required";
    if (!username.includes("@")) return "Username must be an email address.";
    // No error
    return null;
  };

  const handleEmailChange = (event) => {
    setCredentials({ ...credentials, username: event.target.value });
  };
  const handlePasswordChange = (event) => {
    setCredentials({ ...credentials, password: event.target.value });
  };

  // Submits the form and dispatches a request to the backend
  const handleSubmit = () => {
    // Tests username and password for specific errors.
    setInputError({
      ...inputError,
      username: testUsername(credentials.username),
      password: testPassword(credentials.password),
    });

    if (!inputError.username && !inputError.password) {
      dispatch(loginUser(credentials));
    }
  };

  // when a user hits enter
  const handleEnterKey = (event) => {
    if (event.key === "Enter" || event.key === 13) {
      handleSubmit();
    }
  };

  // On each re-render...
  useEffect(() => {
    // on update check the username and password
    setInputError({
      ...inputError,
      username: testUsername(credentials.username),
      password: testPassword(credentials.password),
    });

    // if there is an error update the error message for login
    if (error) {
      setInputError({
        ...inputError,
        loginError: "Incorrect username or password",
      });
    }
    // if the user is logged in navigate them away from here.
    if (user) {
      console.log(user);
      history.push("/");
    }
  }, [credentials, user, error]);

  return (
    <div className="flex flex-col justify-center py-12 text-center">
      <div className="mx-auto">
        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 font-medium text-sm">
          or{" "}
          <a href="#" className=" text-base-blue hover:text-bright-blue">
            Create an account
          </a>
        </p>
      </div>

      <div className="mt-8 mx-auto w-80 bg-white py-8 px-4 rounded-lg">
        <form action="#" className="space-y-6 text-left" onKeyPress={handleEnterKey}>
          <InputEmail
            error={inputError.username}
            handleChange={handleEmailChange}
          />
          <InputPassword
            error={inputError.password}
            handleChange={handlePasswordChange}
          />
          <div className="font-thin text-xs text-red-500">
            {inputError.loginError}
          </div>
          <div className="flex flex-row justify-start text-xs">
            <div className="font-medium text-base-blue hover:text-bright-blue -mt-3 cursor-pointer">
              Forgot password?
            </div>
          </div>
          <div
            onClick={handleSubmit}
            className="py-2 block font-semibold shadow-md bg-base-blue hover:bg-opacity-95 text-center text-white rounded-md cursor-pointer"
          >
            Login
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
