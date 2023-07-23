import { useState } from "react";
import { format } from "date-fns";
import Message from "./Message";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useRef } from "react";

export default function Chat() {
  const { username, socket } = useContext(UserContext);
  const [currentRoom, _] = useState("public");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const divUnderMessages = useRef();
  const send_message = () => {
    if (inputMessage.trim() !== "") {
      const msg = {
        contents: inputMessage,
        sender: username,
        send_time: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      };
      socket.emit("send_message", msg);

      setMessages((oldMessages) => {
        const newMessages = [...oldMessages, msg];
        return newMessages;
      });
    }
    setInputMessage("");
  };
  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessages((oldMessages) => {
        const newMessages = [...oldMessages, msg];
        return newMessages;
      });
    });
  }, [socket]);
  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);
  return (
    <>
      <div className="flex flex-row h-full justify-between">
        <div className="h-full w-1/4 bg-red-200">
          <div className="border bg-black text-center text-white">
            {currentRoom}
          </div>
        </div>
        <div className="h-full w-3/4 bg-blue-200 flex flex-col">
          <div className="bg-teal-400 w-full overflow-y-auto gap-2 no-scrollbar flex-grow">
            {messages.map((message, index) => {
              return <Message key={index} message={message} />;
            })}
            <div ref={divUnderMessages}></div>
          </div>
          <div className="flex justify-between">
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
    </>
  );
}
