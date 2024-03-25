import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { io } from "socket.io-client";
const socket = io("https://chat-test-cpoo.onrender.com");
<<<<<<< HEAD
=======

>>>>>>> fabf888ec4b709cd317cbe77eb21145e1d2c2b43
function Chat() {
  const loc = useLocation();
  const { room } = useParams();
  const data = loc.state;
  const [messages, setmessages] = useState([{ user: "mohana", message: "hihd" }]);
  const [newMessage, setNewMessage] = useState("");
<<<<<<< HEAD
=======
  const messagesEndRef = useRef(null);

>>>>>>> fabf888ec4b709cd317cbe77eb21145e1d2c2b43
    socket.emit("connecting room", data.route);
    socket.on("show", (mess, user) => {
<<<<<<< HEAD
      console.log(mess);
      let newmessage = [...messages];
      newmessage.push({ user: user, message: mess });
      console.log(newmessage);
      setmessages(newmessage);})
  function message() {
    console.log("hi");
=======
scrollToBottom();
      setMessages(prevMessages => [...prevMessages, { user, message: mess }]);
    });
useEffect(()=>{
  axios.get(`https://chat-test-cpoo.onrender.com/${room}`).then(
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
>>>>>>> fabf888ec4b709cd317cbe77eb21145e1d2c2b43
    socket.emit("message", newMessage, room, data.name);
    setNewMessage("");
  }

  return (
    <div className=" h-screen bg-black p-2">
      <div className="messages">
        {messages.map((i, j) => (
          <div
            key={j}
            className={
              data.name == i.user
                ? "border-white border  bg-white w-36 relative  p-1 rounded-2xl"
                : "border-white border bg-gray-500 w-36  right-1  p-1 rounded-2xl"
            }
          >
            <h1 className="flex justify-end font-bold">{i.user}</h1>
            <h1>{i.message}</h1>
          </div>
        ))}
      </div>
      <div className=" fixed bottom-4 flex justify-center w-full">
        <textarea
          className="textarea w-96"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={message}>➡️</button>
      </div>
    </div>
  );
}

export default Chat;