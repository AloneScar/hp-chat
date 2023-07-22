import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    axios.get("/auth").then((resp) => {
      if (resp.status === 200) {
        setId(resp.data.id);
        setUsername(resp.data.username);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </UserContext.Provider>
  );
}
