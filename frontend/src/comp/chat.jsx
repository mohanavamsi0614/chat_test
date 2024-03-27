import axios from "axios";
import { useState, useEffect, useRef } from "react";
import {  useLocation, useParams } from "react-router";
import { io } from "socket.io-client";
import Nav from "./nav";

const socket = io("https://chat-test-cpoo.onrender.com");
function getCookie(name) {
  let cookieArray = document.cookie.split('; ')
  let cookie = cookieArray.find((row) => row.startsWith(name + '='))
  return cookie ? cookie.split('=')[1] :""
}
function Chat() {
  const loc=useLocation()
  const data=loc.state
  const [messages, setmessages] = useState([{ user: "mohana", message: "hihd" }]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef=useRef()
    socket.emit("connecting room",data.route);

    socket.on("show", (mess, user) => {
      console.log(mess);
      let newmessage = [...messages];
      newmessage.push({ user: user, message: mess });
      console.log(newmessage);
      setmessages(newmessage);
    });

   useEffect(()=>{
    scrollToBottom()
   },[messages])
   useEffect(()=>{
    axios.get(`https://chat-test-cpoo.onrender.com/${data.route}`,{
      withCredentials: true
    }).then(
      (res)=>{
        const response=res.data.messages
        const newdata=[...messages]
        response.map((i)=>{
          newdata.push(i)
        })
        setmessages(newdata)
      }
    )
   },[data.route])
    const scrollToBottom = () => {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    };

  function message() {
    console.log("hi");
    socket.emit("message", newMessage, data.route,getCookie("username"));
    setNewMessage("");
  }

  return (
    <>
    <Nav/>
    <div className="h-screen bg-black p-2 flex flex-col justify-center items-center">
  <div className="overflow-y-scroll h-4/6 w-96 relative " ref={chatContainerRef}>
    {messages.map((i, j) => (
      <div
        key={j}
        className={
          getCookie("username") === i.user
            ? "border border-gray-800 m-2 bg-gray-800 ml-32 text-white w-56 relative p-3 rounded-xl shadow-xl"
            : "border border-gray-800 m-2 bg-gray-700  text-white w-56 right-1 p-3 rounded-xl shadow-xl"
        }
      >
        <h1 className="font-semibold">{i.user}</h1>
        <p>{i.message}</p>
      </div>
    ))}
  </div>
  <div className="fixed bottom-4 flex justify-center w-full">
    <textarea
      className="w-96 bg-gray-800 text-white p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      placeholder="Type your message..."
    />
    <button onClick={message} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ml-4">
      Send
    </button>
  </div>
</div>

 </>
  );
}

export default Chat;