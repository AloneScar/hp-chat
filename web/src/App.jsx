import axios from "axios";
import Pages from "./Pages";
import { UserContextProvider } from "./UserContext";

function App() {
  axios.defaults.baseURL = "https://hp-chat-api.zeabur.app/api";
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Pages />
    </UserContextProvider>
  );
}

export default App;
