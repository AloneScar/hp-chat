import {
  ArrowLeftOnRectangleIcon,
  UsersIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Avatar from "./Avatar";

const MySwal = withReactContent(Swal);

export default function Navbar({ setIsHidden }) {
  const {
    socket,
    setId,
    isDark,
    setIsDark,
    username,
    setUsername,
    setSocket,
    qq,
    setQQ,
  } = useContext(UserContext);
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
  const handle_change_user_info = async () => {
    const { value: formValues } = await MySwal.fire({
      title: "Update your profile",
      showCancelButton: true,
      html:
        "<p>It will get your qq avatar</p>" +
        `<input id="swal-input1" class="swal2-input" placeholder="${
          qq === "" ? "QQ number" : qq
        }">` +
        `<input id="swal-input2" class="swal2-input" placeholder="${username}">`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    if (formValues) {
      const newQQ = formValues[0];
      const newUsername = formValues[1];
      if (newQQ.trim() !== "" && newQQ !== qq) {
        axios.get(`/user/qq/${newQQ}`).then((resp) => {
          if (resp.status === 201) {
            setQQ(resp.data);
          }
        });
      }
      if (newUsername.trim() !== "" && newUsername !== username) {
        axios
          .post(`/user/username`, {
            username: newUsername,
          })
          .then((resp) => {
            if (resp.status === 201) {
              setUsername(resp.data);
            }
          });
      }
    }
  };
  return (
    <div className="flex flex-row my-1 mx-2 bg-[#4C4B16] dark:bg-[#9DB2BF] p-1 justify-between items-center">
      <div className="flex flex-row gap-2">
        <button onClick={() => setIsHidden(true)}>
          <UsersIcon className="w-7 h-7" />
        </button>
        <button
          onClick={() => {
            localStorage.setItem("isDark", !isDark);
            setIsDark(!isDark);
          }}
        >
          {!isDark && <SunIcon className="w-7 h-7" />}
          {isDark && <MoonIcon className="w-7 h-7" />}
        </button>
      </div>
      <div className="flex gap-2">
        <button
          className="flex justify-center items-center"
          onClick={() => handle_change_user_info()}
        >
          <span className="mr-2 text-lg">{username}</span>
          <Avatar />
        </button>
        <button className="mr-1" onClick={() => handle_logout()}>
          <ArrowLeftOnRectangleIcon className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
