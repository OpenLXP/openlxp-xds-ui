import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerNewUser } from "../../store/user";

import InputEmail from "./Inputs/InputEmail";
import InputName from "./Inputs/InputName";
import InputPassword from "./Inputs/InputPassword";

import Button from "../common/inputs/Button";
import PageWrapper from "../common/PageWrapper";
import ErrorMessage from "../common/messages/ErrorMessage";
import DefaultInput from "../common/inputs/DefaultInput";

const SignUp = (props) => {
  const { user, status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const [inputError, setInputError] = useState({
    email: null,
    first_name: null,
    last_name: null,
    password: null,
  });

  // tests for the password
  const testPassword = (password) => {
    if (password === "") return "This field is required";
    if (password.length < 8)
      return "The password must contain at least 8 characters";
    // No error
    return null;
  };

  // tests for the name
  const testName = (name) => {
    if (name === "") return "This field is required";
    // No error
    return null;
  };

  // tests for the email
  const testEmail = (email) => {
    if (email === "") return "This field is required";
    if (!email.includes("@")) return "Email must be an email address.";
    // No error
    return null;
  };

  const handleEmailChange = (event) => {
    setCredentials({ ...credentials, email: event.target.value });
  };
  const handleFnameChange = (event) => {
    setCredentials({ ...credentials, first_name: event.target.value });
  };
  const handleLnameChange = (event) => {
    setCredentials({ ...credentials, last_name: event.target.value });
  };
  const handlePasswordChange = (event) => {
    setCredentials({ ...credentials, password: event.target.value });
  };

  // Submits the form and dispatches a request to the backend
  const handleSubmit = () => {
    // Tests email and password for specific errors.
    setInputError({
      email: testEmail(credentials.email),
      first_name: testName(credentials.first_name),
      last_name: testName(credentials.last_name),
      password: testPassword(credentials.password),
    });

    if (
      !inputError.email &&
      !inputError.password &&
      !inputError.first_name &&
      !inputError.last_name
    ) {
      dispatch(registerNewUser(credentials));
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
    // setInputError({
    //   ...inputError,
    //   email: testEmail(credentials.email),
    //   first_name: testName(credentials.first_name),
    //   last_name: testName(credentials.last_name),
    //   password: testPassword(credentials.password),
    // });

    // if the user is logged in navigate them away from here.
    if (user) {
      history.push("/");
    }
  }, [credentials, user, error]);

  const handleSignin = () => {
    props.history.push("/Signin");
  };

  return (
    <PageWrapper>
    <div className="flex flex-col justify-center py-12 text-center">
      <div className="mx-auto">
        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
          Sign up for your account
        </h2>
        <div onClick={handleSignin} className="mt-2 font-medium text-sm">
          Already have an account?{" "}
          <a href="#" className=" text-base-blue hover:text-bright-blue">
            Sign in
          </a>
        </div>
      </div>

      <div className="mt-8 mx-auto w-80 bg-white py-8 px-4 rounded-lg">
        <form
          action="#"
          className="space-y-6 text-left"
          onKeyPress={handleEnterKey}>
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
              error={inputError.email}
              handleChange={handleEmailChange}
              className=""
            />
            <ErrorMessage error={inputError.email} />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <DefaultInput
              type="text"
              placeholder="Name"
              error={inputError.first_name}
              handleChange={handleFnameChange}
              className=""
            />
            <ErrorMessage error={inputError.name} />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <DefaultInput
              type="text"
              placeholder="Name"
              error={inputError.last_name}
              handleChange={handleLnameChange}
              className=""
            />
            <ErrorMessage error={inputError.name} />
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
          <div className="font-thin text-xs text-red-500">
            {inputError.loginError}
          </div>
          <Button
              className="w-full py-2 font-semibold"
              onClick={handleSubmit}
              title="Create account"
            />
        </form>
      </div>
    </div>
    </PageWrapper>
  );
};

export default SignUp;
