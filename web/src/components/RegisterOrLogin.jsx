import axios from "axios";
import { useState } from "react";
import { UserContext } from "../UserContext";
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
    <div className="flex justify-center h-full">
      <div className="flex flex-col justify-center gap-2">
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="username"
              className="w-full hover:outline-none focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="w-full hover:outline-none focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full" onClick={() => handle_submit()}>
              REGISTER
            </button>
            <div className="w-full text-center">
              Already a member?{" "}
              <button
                onClick={() => {
                  setUsername("");
                  setPassword("");
                  setIsLogin(!isLogin);
                }}
                className="underline"
              >
                Login
              </button>
              !
            </div>
          </>
        )}
        {isLogin && (
          <>
            <input
              type="text"
              placeholder="username"
              className="w-full hover:outline-none focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="w-full hover:outline-none focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full" onClick={() => handle_submit()}>
              LOGIN
            </button>
            <div className="w-full text-center">
              Don`t have an account?{" "}
              <button
                onClick={() => {
                  setUsername("");
                  setPassword("");
                  setIsLogin(!isLogin);
                }}
                className="underline"
              >
                Register
              </button>
              !
            </div>
          </>
        )}
      </div>
    </div>
  );
}
