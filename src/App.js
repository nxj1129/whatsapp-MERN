import "./App.css";
import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Pusher from "pusher-js";
import axios from "./backend/axios.js";

function App() {
  const [messages, setMessages] = useState([]);

  //fetching all initial information
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("9ed45746af99e3095e8e", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
