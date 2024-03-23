import { useEffect, useRef,useState } from "react";
import { useLocation } from "react-router";
import socket from "../main";
import axios from "axios";

function Chat() {
    const loc=useLocation()
    const data=loc.state
    const [messages,setmessages]=useState([{user:"mohana",message:"hihd"}])
    const messag=useRef()
    socket.emit("connecting room",data.route)
    socket.off("show")
    useEffect( ()=>{
        axios.get(`https://test-0qaq.onrender.com/data/${data.route}`).then(
            (res)=>{
                const response=res.data
                let newmessage=[...messages]
                response.map((response)=>{
                newmessage.push(response)
                })
                setmessages(newmessage)  
            })
    })
    function message() {
        socket.emit("message",messag.current.value,data.route,data.name)
        socket.on("show",(mess,user)=>{
            console.log(mess)
            let newmessage=[...messages]
            newmessage.push({user:user,message:mess})
            setmessages(newmessage)
        })
    }
    return(
        <div className=" h-screen bg-black p-2">
            <div className="messages">
{/* here we will be getting data from db 🔥 */}
{messages.map((i,j)=>(
    <div key={j} className={localStorage.getItem("name")==i.user ? "border-white border  bg-white w-36 relative  p-1 rounded-2xl" :"border-white border bg-gray-500 w-36 absolute right-1  p-1 rounded-2xl" }> 
    {console.log(i)}
     {/* here you will vilidate with token i in the cokkies grey for user and black for other */}
    <h1 className="flex justify-end font-bold">{i.user}</h1>
        <h1>{i.message}</h1>
    </div> 
))}
            </div>
            <div className=" fixed bottom-4 flex justify-center w-full"><textarea className="textarea w-96" ref={messag}/>
            <button onClick={message}>➡️</button>
            </div>
        </div>
    )
}
export default Chat;