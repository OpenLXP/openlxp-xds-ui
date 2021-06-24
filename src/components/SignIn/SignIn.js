import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../store/user";
import InputEmail from "./Inputs/InputEmail";
import InputPassword from "./Inputs/InputPassword";

import Button from "../common/inputs/Button";
import PageWrapper from "../common/PageWrapper";
import ErrorMessage from "../common/messages/ErrorMessage";
import DefaultInput from "../common/inputs/DefaultInput";

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
    // if there is an error update the error message for login
    if (error) {
      setInputError({
        ...inputError,
        loginError: "Incorrect username or password",
      });
    }
    // if the user is logged in navigate them away from here.
    if (user) {
      history.push("/");
    }
  }, [credentials, user, error]);

  const handleSignup = () => {
    // alert("Sign Up Complete");
    props.history.push("/Signup");
  };

  return (
    <PageWrapper>
      <div className="flex flex-col justify-center text-center py-10">
        <h2 className="text-center text-xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <div className="mt-2 mx-auto font-medium text-sm flex flex-row">
          or&nbsp;
          <span
            onClick={handleSignup}
            className="text-base-blue hover:text-bright-blue"
          >
            Create an account
          </span>
        </div>

        <div className="mx-auto bg-white w-80 py-8 px-4 rounded-lg">
          <form
            action="#"
            className="space-y-6 text-left"
            onKeyPress={handleEnterKey}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <DefaultInput
                type="text"
                placeholder="Email"
                error={inputError.username}
                handleChange={handleEmailChange}
                className=""
              />
              <ErrorMessage error={inputError.username} />
            </div>

            <div>
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <DefaultInput
                type="Password"
                placeholder="Password"
                error={inputError.password}
                handleChange={handlePasswordChange}
                className=""
              />
              <ErrorMessage error={inputError.password} />
            </div>
            <ErrorMessage error={inputError.loginError} />

            <div className="flex flex-row justify-start text-xs">
              <div className="font-medium text-base-blue hover:text-bright-blue -mt-3 cursor-pointer">
                Forgot password?
              </div>
            </div>
            <Button
              className="w-full py-2 font-semibold"
              onClick={handleSubmit}
              title="Login"
            />
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SignIn;
