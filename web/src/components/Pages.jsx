import RegisterOrLogin from "./RegisterOrLogin";
import Chat from "./Chat";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function Pages() {
  const { username } = useContext(UserContext);
  return (
    <div className="h-screen">
      {username && <Chat />}
      {!username && <RegisterOrLogin />}
    </div>
  );
}
