import { useState, useRef } from "react";
import { useLocation, useParams } from "react-router";
import socket from "../main";

function Chat() {
  const loc = useLocation();
  const { room } = useParams();
  const data = loc.state;
  const [messages, setmessages] = useState([{ user: "mohana", message: "hihd" }]);
  const messag = useRef();

  socket.emit("connecting room", room);
  socket.off("show");

  socket.on("show", (mess, user) => {
    console.log(mess);
    let newmessage = [...messages];
    newmessage.push({ user: user, message: mess });
    console.log(newmessage);
    setmessages(newmessage);
  });

  function message() {
    console.log("hi");
    socket.emit("message", messag.current.value, room, data.name);
    messag.current.value = "";
  }

  return (
    <div className=" h-screen bg-black p-2">
      <div className="messages">
        {/* here we will be getting data from db 🔥 */}
        {messages.map((i, j) => (
          <div
            key={j}
            className={
              localStorage.getItem("name") == i.user
                ? "border-white border  bg-white w-36 relative  p-1 rounded-2xl"
                : "border-white border bg-gray-500 w-36  right-1  p-1 rounded-2xl"
            }
          >
            {/* here you will vilidate with token i in the cokkies grey for user and black for other */}
            <h1 className="flex justify-end font-bold">{i.user}</h1>
            <h1>{i.message}</h1>
          </div>
        ))}
      </div>
      <div className=" fixed bottom-4 flex justify-center w-full">
        <textarea className="textarea w-96" ref={messag} />
        <button onClick={message}>➡️</button>
      </div>
    </div>
  );
}

export default Chat;