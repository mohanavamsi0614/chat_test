import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
function Sigin() {
    const [data,setvalue]=useState({})
    const [error,seterror]=useState({})
    const nav=useNavigate()
    function va(e) {
        const {name,value}=e.target
        const ne={...data}
        ne[name]=value
        setvalue(ne)
    }
    function submit() {
        console.log(data)
        console.log((Object.keys(data)))
        if (Object.keys(data).length==3){
        axios.post("https://chat-test-cpoo.onrender.com/sign",data).then(
            (res)=>{
                const response=res
                console.log(response)
                switch (response.data.message){
                    case "\"email\" must be a valid email":
                        seterror({...error,email:"give the mail proprerly"})
                        break
                    case "the custmore is already in db":
                        seterror({...error,login:"you are already in having an account please login"})
                        break
                    case "so sorry usernametaken":
                        seterror({...error,login:"so sorry UserName taken"})
                        break
                    case '"password" is not allowed to be empty':
                        seterror({...error,password:"give the password"})
                        break
                    case '"name" is not allowed to be empty':
                        seterror({...error,name:"enter the name"})  
                        break 
                    case "Pushpa data saved successfully!":
                        nav("/")
                }
            }
        ).catch((e)=>{console.log(e)})
        }
        else{
            alert("hey please check all again! and submit")
        }
    }
    return(
        <div className="h-screen bg-black flex justify-center items-center flex-col">
     {error.login && (<div className=" w-70 bg-red-400 m-2 text-white rounded-xl p-4">{error.login}</div>)}

        <div className="w-80 rounded-2xl bg-slate-900">
     <div className="flex flex-col gap-2 p-8">
     <p className="text-center text-3xl text-gray-300 mb-4">Sign</p>
       <input className="bg-slate-900 text-white w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" 
       name="name"
       onChange={(e)=>{va(e)}}
       placeholder="Name"/>
       <span>{error.name || ""}</span>
       <input className="bg-slate-900 text-white w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" 
       name="email"
       onChange={(e)=>{va(e)}}
       placeholder="Email"/>
       <span>{error.email || ""}</span>
       <input className="bg-slate-900 text-white w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" 
       name="password"
       type="password"
       onChange={(e)=>{va(e)}}
       placeholder="Password"/>
       <span>{error.password || ""}</span>
       <button className="cursor-pointer transition-all 
   bg-gray-700 text-white px-6 py-2 rounded-lg
   border-green-400
   border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
   active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none"
   onClick={submit}>
     Sign
   </button>
   <Link className=" text-purple-600 text-center" to={"/login"}>Login</Link>

     </div>
   </div>
       {/* <button onClick={submit}>Submit</button> */}
   </div>
    )
}
export default Sigin;