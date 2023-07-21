import axios from "axios";
import Pages from "./Pages";
import { UserContextProvider } from "./UserContext";

function App() {
  axios.defaults.baseURL = "http://localhost:5555/api";
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Pages />
    </UserContextProvider>
  );
}

export default App;
