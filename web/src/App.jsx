import axios from "axios";
import Pages from "./components/Pages";
import { UserContextProvider } from "./contexts/UserContext";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASEURL;
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Pages />
    </UserContextProvider>
  );
}

export default App;
