import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router";
import { io } from "socket.io-client";
const socket = io("https://test-0qaq.onrender.com");

function Chat() {
  const loc = useLocation();
  const { room } = useParams();
  const data = loc.state;
  const [messages, setMessages] = useState([{ user: "mohana", message: "hihd" }]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("connecting room", data.route);

    socket.on("show", (mess, user) => {
      setMessages(prevMessages => [...prevMessages, { user, message: mess }]);
    });

    scrollToBottom();
    return () => {
      socket.off("show");
    };
  }, [data.route, messages]);
useEffect(()=>{
  axios.get(`http://localhost:5000/${room}`).then(
    (res)=>{
      const data=res.data.messages
      const hisrtort=[...messages]
      data.map((i)=>{
        hisrtort.push(i)
      })
      setMessages(hisrtort)
    }
  )
},[])
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function sendMessage() {
    socket.emit("message", newMessage, room, data.name);
    setNewMessage("");
  }

  return (
    <div className="h-screen bg-black p-2 flex flex-col justify-between">
      <div className="messages overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              localStorage.getItem("name") === msg.user
                ? "self-end bg-blue-500"
                : "self-start bg-gray-800"
            } p-2 m-2 rounded-lg w-max`}
          >
            <p className="text-white font-bold">{msg.user}</p>
            <p className="text-white">{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex justify-center items-center">
        <textarea
          className="textarea w-96 p-2 rounded-lg resize-none bg-gray-800 text-white"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
