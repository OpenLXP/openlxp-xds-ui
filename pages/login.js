import DefaultLayout from "components/layouts/DefaultLayout";
import {useAuth} from "contexts/AuthContext";
import useField from "hooks/useField";
import React from "react";

export default function Login() {
  const { login } = useAuth()
  const [credentials, setCredentials] = useField({
    username: "",
    password: ""
  })

  return (
    <DefaultLayout>
      <div className={""}>
        <input type={"text"}
               value={credentials.username}
               placeholder={"username"}
               name={"username"}
               onChange={(event) => setCredentials(event)}
        />
        <input type={"password"}
               value={credentials.password}
               placeholder={"password"}
               name={"password"}
               onChange={(event) => setCredentials(event)}
        />
        <div className={"h-20 w-20 bg-blue"}
             onClick={() => login(credentials)}>Login
        </div>
      </div>
    </DefaultLayout>
  )
}
