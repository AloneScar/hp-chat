import axios from "axios";
import Navbar from "./Navbar";
import Messages from "./Messages";
import ContactList from "./ContactList";
import MessageNewForm from "./MessageNewForm";
import { UserContext } from "../../contexts/UserContext";
import { useState, useEffect, useContext, useRef } from "react";

export default function Chat() {
  const { socket } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [currentContact, setCurrentContact] = useState({});
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const scrollEndBtn = useRef();
  const [isHidden, setIsHidden] = useState(false);
  const scroll_end = () => {
    const btn = scrollEndBtn.current;
    btn.click();
  };
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
    socket.on(currentContact._id, (msg) => {
      update_local_messages(msg);
    });
  }, [socket]);
  useEffect(() => {
    scroll_end();
  }, [messages]);
  useEffect(() => {
    axios.get("/chat/contacts").then(async (res) => {
      if (res.status === 200) {
        setUsers(res.data.usersDoc);
        setRooms(res.data.roomsDoc);
        const defaultRoom = res.data.roomsDoc.filter(
          (room) => room.roomname === "Public",
        )[0];
        setCurrentContact(defaultRoom);
        await axios.get(`/chat/room/${defaultRoom._id}`).then((resp) => {
          if (resp.status === 200) {
            resp.data.forEach((msg) => {
              update_local_messages(msg);
            });
          }
        });
      }
    });
  }, []);
  return (
    <>
      <div className="w-full h-full flex flex-col bg-[#BA704F] dark:bg-[#27374D] absolute">
        <ContactList isHidden={isHidden} setIshidden={setIsHidden} />
        <Navbar setIsHidden={setIsHidden} />
        <Messages messages={messages} />
        <MessageNewForm
          currentContact={currentContact}
          scrollEndBtn={scrollEndBtn}
          update_local_messages={update_local_messages}
          scroll_end={scroll_end}
        />
      </div>
    </>
  );
}
