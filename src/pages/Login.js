/**
 * Login to an account
 */

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import PageWrapper from "../components/common/PageWrapper";
import { ErrorMessage, Header, Link } from "../components/common/text/Text";
import { Button } from "../components/common/button/Buttons";
import { InputField } from "../components/common/input/Input";

import DefaultInput from "../components/common/inputs/DefaultInput";
import { loginUser } from "../store/user";
export default function Login({}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => {
    console.log(state);
    return state.user;
  });

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    // validate credentials
    dispatch(loginUser(login));
    if (!error && status !== "idle") {
      history.push("/");
    }
  };

  const handleSignUp = () => {
    history.push("/register");
  };

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    console.log(login);
  };

  const handleForgotPassword = (e) => {
    console.log("Oh NO!");
  };

  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center">
        <Header title="Sign in to your account" />
        <span className="mb-4">
          or&nbsp;
          <Link onClick={handleSignUp}>Create an account</Link>
        </span>
      </div>

      <div className="mx-auto bg-white w-80 rounded-md py-8 px-4 mb-10">
        <div className="space-y-6 text-left">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <InputField
              type="text"
              placeholder="Email"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username">Password</label>
            <InputField
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <Link onClick={handleForgotPassword} size="xs">
            Forgot Password?
          </Link>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button size="sm" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
