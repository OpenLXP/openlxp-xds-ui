import { useState } from "react";
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
    username: "",
    password: "",
  });

  const handleEmailChange = (event) => {
    setCredentials({ ...credentials, username: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setCredentials({ ...credentials, password: event.target.value });
  };

  const handleSubmit = () => {
    
    if (credentials.username === "") {
      inputError.username = "This field cannot be blank";
    }

    if (credentials.password === "") {
      inputError.password = "This field cannot be blank";
    }

    if (credentials.username.length > 3 && credentials.password.length > 3) {
      setInputError({
        username: "",
        password: "",
      });

      dispatch(loginUser(credentials)).then((response) => {});
    }
  };

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
        <div className="mt-2 text-left">
          <form action="#" className="space-y-6">
            <InputEmail
              error={inputError.username}
              handleChange={handleEmailChange}
            />
            <InputPassword
              error={inputError.password}
              handleChange={handlePasswordChange}
            />
            <div className="flex flex-row justify-start text-xs">
              <div className="font-medium text-base-blue hover:text-bright-blue -mt-3">
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
    </div>
  );
};

export default SignIn;
