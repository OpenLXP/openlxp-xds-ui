import classes from "./SignUp.module.css";
import { useState } from "react";

const SignIn = (props) => {

  const handleSignup = () => {
    // alert("Sign Up Complete");
    props.history.push("/");
  };
  const handleSignIn = () => {
    props.history.push("/signIn");
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>Sign Up</div>
      <form className={classes.inputWrapper}>
        <input required className={classes.input} placeholder={" Full Name"} />
        <input required className={classes.input} placeholder={" Username/Email"} />
        <input required className={classes.input} placeholder={" Password"} />
      </form>
      <div onClick={handleSignup} className={classes.loginBtn}>
        Sign Up
        </div>
      <div className={classes.text}>Already have an account?
            <a onClick={handleSignIn} className={classes.link}>
            Sign In
            </a>
      </div>
    </div>
  );
};

export default SignIn;
