import {useAuth} from "contexts/AuthContext";

export default function UserMenu() {
  const { user: { user: { email } } } = useAuth()
  return (
    <div className={"text-gray-900"}>
      {email}
    </div>
  )
}
