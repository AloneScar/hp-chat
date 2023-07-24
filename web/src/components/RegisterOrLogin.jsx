import axios from "axios";
import { useState } from "react";
import { UserContext } from "../UserContext";
import AuthForm from "./AuthForm";
import { useContext } from "react";
import { io } from "socket.io-client";

export default function RegisterOrLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const {
    setUsername: setLoginedUsername,
    setId,
    setSocket,
  } = useContext(UserContext);
  function handle_submit() {
    const url = isLogin ? "/auth/login" : "/auth/register";
    axios
      .post(url, {
        username,
        password,
      })
      .then((resp) => {
        if (resp.status === 201) {
          setIsLogin(true);
        } else if (resp.status === 200) {
          setLoginedUsername(username);
          setSocket(io(import.meta.env.VITE_SOCKETIO_URL));
          setId(resp.data.id);
        }
      });
  }
  return (
    <div className="flex justify-center h-full bg-[#B5C99A] dark:bg-[#27374D]">
      <div className="flex flex-col justify-center mx-3">
        <AuthForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handle_submit={handle_submit}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
      </div>
    </div>
  );
}
