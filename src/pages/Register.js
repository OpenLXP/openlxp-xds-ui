import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InputField } from "../components/common/input/Inputs";
import { Link, ErrorText, Title } from "../components/common/text/text";
import PageWrapper from "../components/common/PageWrapper";
import { registerNewUser } from "../store/user";
import { Button } from "../components/common/button/buttons";

/**
 * Register an account
 */
export default function Register() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user, status, error } = useSelector((state) => state.user);

  const [register, setRegister] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const handleSignIn = () => {
    history.push("/signin");
  };

  const handleRegister = () => {
    dispatch(registerNewUser(register));

    if (!error && status !== "idle") {
      history.push("/");
    }
  };
  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center my-8">
        <Title title="Sign up for your account" />
        <span className="text-sm select-none">
          Already have an accout?&nbsp;
          <Link onClick={handleSignIn}>Sign in</Link>
        </span>
      </div>

      <div className="mx-auto bg-white w-80 rounded-md py-8 px-4 my-10">
        <div className="space-y-6 text-left">
          <div>
            <label htmlFor="Email">Email</label>
            <InputField
              onChange={handleChange}
              name="email"
              placeholder="Email"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="First Name">First Name</label>
            <InputField
              onChange={handleChange}
              name="first_name"
              placeholder="First Name"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="Last Name">Last Name</label>
            <InputField
              onChange={handleChange}
              name="last_name"
              placeholder="Last Name"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <InputField
              onChange={handleChange}
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>
          {error && <ErrorText>{error}</ErrorText>}
          <Button onClick={handleRegister}>
            {status === "loading" ? "Creating..." : "Create Account"}
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
