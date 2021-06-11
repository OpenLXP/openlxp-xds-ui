import classes from "./SignIn.module.css";
import { useState } from "react";

const SignIn = (props) => {

  const handleLogin = () => {
    props.history.push("/");
  };
  const forgotPassword = () => {
    props.history.push("/forgotPassword");
  };
  const handleSignup = () => {
    props.history.push("/signUp");
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>Sign In</div>
      <form className={classes.inputWrapper}>
        <input required className={classes.input} placeholder={" Username/Email"} />
        <input required className={classes.input} placeholder={" Password"} />
      </form>
      <div onClick={handleLogin} className={classes.loginBtn}>
        Sign In
        </div>
      <div className={classes.text}>or
            <a onClick={forgotPassword} className={classes.link}>
          Forgot Password?
            </a>
      </div>
      <div className={classes.text}>Don't have an account?
            <a onClick={handleSignup} className={classes.link}>
          Sign up
            </a>
      </div>
    </div>
  );
};

export default SignIn;
