import classes from "./ForgotPassword.module.css";
import { useState } from "react";

const ForgotPassword = (props) => {
  let [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleResetPassword = () => {
    alert("Reset Password!");
    props.history.push("/dashboard");
  };
  const handleLogin = () => {
    props.history.push("/signIn");
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>Forgot Password</div>
      <input className={classes.input} placeholder={"Username/Email"} />
      <div onClick={handleResetPassword} className={classes.loginBtn}>
        Reset Password
      </div>
      <div className={classes.text}>
        or
        <a onClick={handleLogin} className={classes.link}>
          Login
        </a>
      </div>
    </div>
  );
};

export default ForgotPassword;
