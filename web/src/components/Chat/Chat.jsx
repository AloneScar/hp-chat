import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Messages from "./Messages";
import MessageNewForm from "./MessageNewForm";
import { UserContext } from "../../contexts/UserContext";
import RoomList from "./RoomList";

export default function Chat() {
  const { socket } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const scrollEndBtn = useRef();
  const [isHidden, setIsHidden] = useState(false);
  const update_local_messages = (msg) => {
    setMessages((oldMsgs) => {
      if (oldMsgs.length !== 0) {
        const prevIndex = oldMsgs.length - 1;
        if (oldMsgs[prevIndex].sender === msg.sender) {
          oldMsgs[prevIndex].send_time = msg.send_time;
          oldMsgs[prevIndex].contents.push(msg.contents);
          const newMsgs = [...oldMsgs];
          return newMsgs;
        }
      }
      return [
        ...oldMsgs,
        {
          sender: msg.sender,
          contents: [msg.contents],
          send_time: msg.send_time,
        },
      ];
    });
  };
  useEffect(() => {
    socket.on("receive_message", (msg) => {
      update_local_messages(msg);
    });
  }, [socket]);
  useEffect(() => {
    const btn = scrollEndBtn.current;
    btn.click();
  }, [messages]);
  useEffect(() => {
    axios.get("/chat").then((resp) => {
      if (resp.status === 200) {
        resp.data.forEach((msg) => {
          update_local_messages(msg);
        });
      }
    });
  }, []);
  return (
    <>
      <div className="w-full h-full flex flex-col bg-[#BA704F] dark:bg-[#27374D] absolute">
        <RoomList isHidden={isHidden} setIshidden={setIsHidden} />
        <Navbar setIsHidden={setIsHidden} />
        <Messages messages={messages} />
        <MessageNewForm
          scrollEndBtn={scrollEndBtn}
          update_local_messages={update_local_messages}
        />
      </div>
    </>
  );
}
