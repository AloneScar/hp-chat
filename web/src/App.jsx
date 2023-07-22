import axios from "axios";
import Pages from "./components/Pages";
import { UserContextProvider } from "./UserContext";

function App() {
  // axios.defaults.baseURL = "https://hp-chat-api.zeabur.app/api";
  axios.defaults.baseURL = "http://localhost:5555/api";
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Pages />
    </UserContextProvider>
  );
}

export default App;
