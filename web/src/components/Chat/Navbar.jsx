import {
  ArrowLeftOnRectangleIcon,
  UsersIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Navbar({ setIsHidden }) {
  const { socket, setId, isDark, setIsDark, username, setUsername, setSocket } =
    useContext(UserContext);
  const handle_logout = () => {
    MySwal.fire({
      title: "Are you sure want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Keep",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("/auth").then((resp) => {
          if (resp.status === 200) {
            socket.disconnect();
            setId("");
            setUsername("");
            setSocket(null);
          }
        });
      }
    });
  };
  return (
    <div className="flex flex-row my-1 mx-2 bg-[#4C4B16] dark:bg-[#9DB2BF] p-1 justify-between items-center">
      <div className="flex flex-row gap-2">
        <button onClick={() => setIsHidden(true)}>
          <UsersIcon className="w-6 h-6" />
        </button>
        <button
          onClick={() => {
            localStorage.setItem("isDark", !isDark);
            setIsDark(!isDark);
          }}
        >
          {!isDark && <SunIcon className="w-6 h-6" />}
          {isDark && <MoonIcon className="w-6 h-6" />}
        </button>
      </div>
      <div className="flex gap-2">
        <button className="flex justify-center items-center">
          <span>{username}</span>
          <UserCircleIcon className="w-6 h-6 ml-1" />
        </button>
        <button className="mr-1" onClick={() => handle_logout()}>
          <ArrowLeftOnRectangleIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
