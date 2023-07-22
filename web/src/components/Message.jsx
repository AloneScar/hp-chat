import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function Message({ message }) {
  const { username } = useContext(UserContext);
  const { sender, send_time, contents } = message;
  const position = username == sender ? "end" : "start";
  return (
    <div className={`p-1 w-full flex justify-${position}`}>
      <div>
        <div className="text-black">
          {sender} <span>{send_time}</span>
        </div>
        <div className={`text-red-400 text-${position}`}>{contents}</div>
      </div>
    </div>
  );
}
