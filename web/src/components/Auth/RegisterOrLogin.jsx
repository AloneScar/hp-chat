import axios from "axios";
import { useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import AuthForm from "./AuthForm";
import { useContext } from "react";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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
          MySwal.fire({
            icon: "success",
            title: "Register successfully",
            text: "Login quickly!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            setIsLogin(true);
          });
        } else if (resp.status === 200) {
          MySwal.fire({
            icon: "success",
            title: "Login successfully",
            text: "Chat with your friends!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            setLoginedUsername(username);
            setSocket(io(import.meta.env.VITE_SOCKETIO_URL));
            setId(resp.data.id);
          });
        }
      })
      .catch((resp) => {
        if (resp.response.status === 500) {
          console.log("aaa");
          MySwal.fire({
            icon: "error",
            title: "Seems to have gone wrong",
            text: resp.response.data,
            showConfirmButton: true,
          });
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
