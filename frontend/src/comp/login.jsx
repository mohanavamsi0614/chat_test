import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
function Login() {
    const [data,setvalue]=useState({})
    const [error,seterror]=useState({})
    const nav=useNavigate()
    function va(e) {
        const {name,value}=e.target
        const ne={...data}
        ne[name]=value
        setvalue(ne)
        seterror({})
    }
    function submit() {
        console.log(data)
        console.log((Object.keys(data)))
        if (Object.keys(data).length==2){
        axios.post("https://chat-test-cpoo.onrender.com/login",data).then(
            (res)=>{
                const response=res
                console.log(response)
                switch (response.data.message){
                    case "\"email\" must be a valid email":
                        seterror({...error,email:"give the mail proprerly"})
                        break
                    case "password is wrong":
                        seterror({...error,password:"enter the correct password"})
                        break
                    case '"password" is not allowed to be empty':
                        seterror({...error,password:"give the password"})
                        break
                    case '"name" is not allowed to be empty':
                        seterror({...error,name:"enter the name"})  
                        break 
                    case "ok login":
                        console.log(res.data)
                                document.cookie=`username=${response.data._doc.name};`
                                document.cookie=`token=${response.data._doc.token};`
                        nav("/")
                        break
                    case "user not in database please sign":
                        seterror({...error,exit:"you are not in the database please sign"})
                }
            }
        ).catch((e)=>{console.log(e)})
        }
        else{
            alert("hey please check all again! and submit")
        }
    }
    return(
        <div className="h-screen bg-black flex justify-center items-center">
        <div className="w-80 rounded-2xl bg-slate-900">
     <div className="flex flex-col gap-2 p-8">
     <p className="text-center text-3xl text-gray-300 mb-4">Login</p>
     {error.exit && (<div className=" w-70 bg-red-400 text-white rounded-xl p-4">{error.exit}</div>)}
       <input className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800 text-white" 
       name="email"
       onChange={(e)=>{va(e)}}
       placeholder="Email"/>
       <span className=" text-red-700">{error.email || ""}</span>
       <input className="bg-slate-900 text-white w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" 
       name="password"
       onChange={(e)=>{va(e)}}
       placeholder="Password"/>
       <span className=" text-red-700">{error.password || ""}</span>
       <Link className=" text-purple-600" to={"/sigin"}>Not having an account ? then sign</Link>
       <button className="cursor-pointer transition-all 
   bg-gray-700 text-white px-6 py-2 rounded-lg
   border-green-400
   border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
   active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none"
   onClick={submit}>
     Login
   </button>
     </div>
   </div>
       {/* <button onClick={submit}>Submit</button> */}
   </div>
    )
}
export default Login