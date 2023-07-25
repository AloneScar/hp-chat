import RegisterOrLogin from "./Auth/RegisterOrLogin";
import Chat from "./Chat/Chat";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Pages() {
  const { isDark, username } = useContext(UserContext);
  return (
    <div className={`h-screen${isDark ? " dark" : ""}`}>
      {username && <Chat />}
      {!username && <RegisterOrLogin />}
    </div>
  );
}
