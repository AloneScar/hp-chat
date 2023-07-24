import RegisterOrLogin from "./RegisterOrLogin";
import Chat from "./Chat";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import FloatAlert from "./FloatAlert";

export default function Pages() {
  const { isDark, username } = useContext(UserContext);
  return (
    <div className={`h-screen${isDark ? " dark" : ""}`}>
      <FloatAlert />
      {username && <Chat />}
      {!username && <RegisterOrLogin />}
    </div>
  );
}
