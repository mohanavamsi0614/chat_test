import {  useEffect, useState } from "react";
import { io } from "socket.io-client";
import {  useNavigate } from "react-router";
import Nav from "./nav";
import { get } from "mongoose";
import axios from "axios";
function getCookie(name) {
    let cookieArray = document.cookie.split('; ')
    let cookie = cookieArray.find((row) => row.startsWith(name + '='))
    return cookie ? cookie.split('=')[1] :""
}
function Home() {
    const socket=io("https://chat-test-cpoo.onrender.com")
    const nav=useNavigate()
    const [data,setdata]=useState({})
    function roteCreator() {
        if (Object.keys(data).length==1){
        socket.emit("route",data.route,data.name)
        localStorage.setItem("name",data.name)
        nav(`/${data.route}`,{state:data})
        }
        else{
            alert('Please enter the details.');
        }
    }
    useEffect(()=>{
        axios.get("https://chat-test-cpoo.onrender.com/users")
    })
    function handle(e){
        const {name,value}=e
        const u={...data}
        u[name]=value
        setdata(u)
    }
    return(
        <>
        <div className=" bg-black w-screen h-screen flex justify-center items-center flex-col overflow-hidden">
        <div className=" flex justify-center absolute top-4">
        <Nav/>
        </div>

        {getCookie("username") ? ( <div className=" bg-black w-screen h-screen flex justify-center items-center flex-col overflow-hidden">
            <h1 className=" text-white text-5xl  m-3">Chato</h1>
            <p className=" text-white text-xl">Where Privasy materr!!</p>
            <form  className=" flex-col flex justify-between">
            <input placeholder="room id"  className="m-3  p-2 h-10 rounded-xl" name="route" onChange={(e)=>{handle(e.target)}}/>
            </form>
            {/* Anna we need to diffren ative do this with socket id ok bye!!! */}
            <button onClick={roteCreator} className=" w-32 h-12 text-white border border-white hover:bg-white hover:text-black">G0</button>
        </div>) : (<h1 className=" text-white text-3xl">Please login Bro 😑 and also dont worry we will give some marketing animationa and some stuff here in futre this is new omegal so it is open source you can do your own bloody home page WHAT ARE YOU watching loginnnn!!!!! 😡😡🤬 </h1>)}
            
        </div>
        {/* <div>
            <h1> users</h1>
            {}
        </div> */}
        </>
    )
}
export default Home;