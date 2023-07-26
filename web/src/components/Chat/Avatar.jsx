import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function Avatar() {
  const { qq } = useContext(UserContext);
  const [isLoadWell, setIsLoadWell] = useState(true);
  useEffect(() => {
    setIsLoadWell(true);
  }, [qq]);
  if (isLoadWell) {
    return (
      <span className="relative block">
        <img
          className="w-7 h-7 mx-auto object-cover rounded-full border-black"
          src={`https://q.qlogo.cn/g?b=qq&nk=${qq}&s=100`}
          onError={() => setIsLoadWell(false)}
        />
      </span>
    );
  }
  return <UserCircleIcon className="w-7 h-7" />;
}
