import { useRef } from "react";
import { useLocation } from "react-router";
import socket from "../main";

function Chat() {
    const loc=useLocation()
    const data=loc.state
    const messages=[{user:"mohana",message:"hihd"}]
    const messag=useRef()
    socket.emit("connecting room",data.route)
    function message() {
        socket.emit("message",messag.current.value,data.route,data.name)
        socket.on("show",(mess,user)=>{
            console.log(mess,user)
            socket.off("show")
        })
    }
    return(
        <div>
            <div className="messages">
{/* here we will be getting data from db 🔥 */}
{messages.map((i)=>{
    <div>
        {i.message}
    </div>
})}
            </div>
            <div><textarea className="textarea" ref={messag}/>
            <button onClick={message}>➡️</button>
            </div>
        </div>
    )
}
export default Chat;