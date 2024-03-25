import { useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLocation, useNavigate } from "react-router";

function Home() {
    const socket=io("https://test-0qaq.onrender.com")
    const nav=useNavigate()
    const [data,setdata]=useState({})
    function roteCreator() {
        if (Object.keys(data).length==2){
        socket.emit("route",data.route,data.name)
        localStorage.setItem("name",data.name)
        nav(`/${data.route}`,{state:data})
        }
        else{
            alert('Please enter the details.');
        }
    }
    function handle(e){
        const {name,value}=e
        const u={...data}
        u[name]=value
        setdata(u)
    }
    return(
        <div className=" bg-black w-screen h-screen flex justify-center items-center flex-col">
            <h1 className=" text-white text-5xl  m-3">Chato</h1>
            <p className=" text-white text-xl">Where Privasy materr!!</p>
            <form  className=" flex-col flex justify-between">
            <input placeholder="Your name"  className=" m-3 p-2 h-10 rounded-xl" name="name" onChange={(e)=>{handle(e.target)}}/>
            <input placeholder="room id"  className="m-3  p-2 h-10 rounded-xl" name="route" onChange={(e)=>{handle(e.target)}}/>
            </form>
            <button onClick={roteCreator} className=" w-32 h-12 text-white border border-white hover:bg-white hover:text-black">G0</button>
        </div>
    )
}
export default Home;