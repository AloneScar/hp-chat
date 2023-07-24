import { useState } from "react";
import { format } from "date-fns";
import Message from "./Message";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useRef } from "react";
import axios from "axios";

export default function Chat() {
  const { username, socket } = useContext(UserContext);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const divUnderMessages = useRef();
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
  const send_message = () => {
    if (inputMessage.trim() !== "") {
      const msg = {
        contents: inputMessage,
        sender: username,
        send_time: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      };
      socket.emit("send_message", msg);
      update_local_messages(msg);
    }
    setInputMessage("");
  };
  useEffect(() => {
    socket.on("receive_message", (msg) => {
      update_local_messages(msg);
    });
  }, [socket]);
  useEffect(() => {
    const div = divUnderMessages.current;
    div.scrollIntoView({ behavior: "smooth" });
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
    <div className="flex flex-col h-full">
      <div className="w-full h-full bg-blue-200 flex flex-col">
        <div className="flex my-1 mx-2 bg-black py-3"></div>
        <div className="rounded my-1 mx-2 bg-teal-400 overflow-y-auto gap-2 no-scrollbar flex-grow flex flex-col">
          {messages.map((message, index) => {
            return <Message key={index} message={message} />;
          })}
          <div
            className="bg-transparent w-full py-0.5"
            ref={divUnderMessages}
          ></div>
        </div>
        <div className="flex my-1 mx-2 bg-pink-400 justify-between rounded-l-lg">
          <input
            className="flex bg-transparent resize-none border-none h-full hover:outline-none p-2 focus:outline-none flex-grow no-scrollbar"
            placeholder="Say something ..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                send_message();
              }
            }}
          ></input>
          <button className="h-full bg-white" onClick={() => send_message()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
