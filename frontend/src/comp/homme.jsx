import { useRef, useState } from "react";
import socket from "../main";
import { useLocation, useNavigate } from "react-router";

function Home() {
    const nav=useNavigate()
    const [data,setdata]=useState({})
    function roteCreator() {
        if (Object.keys(data).length==2){
        socket.emit("route",k.current.value,nae.current.value)
        // console.log(k.current.value)
        nav(`/${data.route}`,{state:data})
        }
        else{
            alert('Please enter the details');
        }
    }
    const k=useRef()
    const nae=useRef()
    function handle(e){
        const {name,value}=e
        const u={...data}
        u[name]=value
        setdata(u)
    }
    return(
        <div className=" bg-black w-screen h-screen flex justify-center items-center flex-col">
            <h1 className=" text-white text-5xl">Chato</h1>
            <p className=" text-white text-xl">Where Privasy materr!!</p>
            <form  className=" flex-col flex justify-between">
            <input placeholder="Your name"  className=" m-3" name="name" onChange={(e)=>{handle(e.target)}}/>
            <input placeholder="room id"  className="m-3" name="route" onChange={(e)=>{handle(e.target)}}/>
            </form>
            <button onClick={roteCreator} className=" size-20">Submit</button>
            <h1>or....Omegal mode 💀💀💀</h1>
            <button>Random chat rooms</button>
        </div>
    )
}
export default Home;