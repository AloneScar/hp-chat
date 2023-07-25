import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { useContext, useState } from "react";
import ScrollIntoView from "react-scroll-into-view";
import { UserContext } from "../../contexts/UserContext";

export default function MessageNewForm({ scrollEndBtn, scroll_end }) {
  const { username, socket } = useContext(UserContext);
  const [inputMessage, setInputMessage] = useState("");
  const send_message = () => {
    if (inputMessage.trim() !== "") {
      const msg = {
        contents: inputMessage,
        sender: username,
        send_time: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      };
      socket.emit("send_message", msg);
    }
    setInputMessage("");
  };
  return (
    <div className="flex my-1 mx-2 bg-[#85A389] dark:bg-[#0E8388] justify-between rounded-l-lg">
      <input
        className="flex bg-transparent resize-none border-none h-full hover:outline-none p-2 focus:outline-none flex-grow no-scrollbar placeholder-[#61764B] dark:placeholder-[#03001C]"
        placeholder="Say something ..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            send_message();
          }
        }}
        onClick={() => scroll_end()}
      ></input>
      <button
        className="h-full bg-[#4E9F3D] dark:bg-[#3C415C] text-white px-2 text-center"
        onClick={() => send_message()}
      >
        <PaperAirplaneIcon className="w-6 h-6" />
      </button>
      <ScrollIntoView selector="#divUnderMessages">
        <button hidden ref={scrollEndBtn}></button>
      </ScrollIntoView>
    </div>
  );
}
