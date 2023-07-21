import axios from "axios";
import { useState } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";

export default function RegisterOrLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const { setUsername: setLoginedUsername, setId } = useContext(UserContext);
  function handle_submit() {
    const url = isLogin ? "/profile/login" : "/profile/register";
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
              className="input input-bordered input-secondary w-full hover:outline-none focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="input input-bordered input-info w-full hover:outline-none focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-outline btn-primary w-full"
              onClick={() => handle_submit()}
            >
              REGISTER
            </button>
            <div className="w-full text-center">
              Already a member?{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
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
              className="input input-bordered input-secondary w-full hover:outline-none focus:outline-none"
            />
            <input
              type="password"
              placeholder="password"
              className="input input-bordered input-info w-full hover:outline-none focus:outline-none"
            />
            <button
              className="btn btn-outline btn-primary w-full"
              onClick={() => handle_submit()}
            >
              LOGIN
            </button>
            <div className="w-full text-center">
              Don`t have an account?{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
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
