const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const PORT = process.env.PORT || 5000;
const app = express();
const jwt=require("jsonwebtoken")
const server = http.createServer(app);
const io = socketIo(server);
const Joi = require("joi")
const {user}=require("./db")
const { messanger } = require("./db");
const { connec } = require("./db");
const cors = require("cors");
const loginvalid=Joi.object({
    email:Joi.string().email(),
    password:Joi.string().required()
})
app.use(express.json())
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));
app.get("/:room",async(req,res)=>{
    const data=await messanger.findOne({roomid:req.params.room})
    res.json(data)
})
app.post("/sign",async (req,res)=>{
    try{
  const check=await user.findOne({email:req.body.email})
  if(check){
    res.json({message:"the custmore is already in db"})
  }
  else{
const token=jwt.sign(req.body,"secret")
  const userdata = new user({
   name:req.body.name,
   email:req.body.email,
   password:req.body.password,
   token:token
});
if (!signvalid.validate(req.body).error){
    await userdata.save();
    res.status(201).send({ message: "Pushpa data saved successfully!" });
    }

else{
    res.json({message:uservalid.validate(req.body).error.message})
}}}
catch{
    res.status(400).send("something wrong")
}
})
app.post("/login",async (req,res)=>{
        const check=await user.findOne({email:req.body.email})
        console.log(check)
        if(check){
            if(!loginvalid.validate(req.body).error){
            if (req.body.password==check.password){
                res.cookie("username",req.body.email)
                res.json({...check,message:"ok login"})
        }
        else{
            res.status(200).json({message:"password is wrong"})
        }
       }
        else{
            res.status(404).json({message:uservalid.validate(req.body).error.message})
        }
       
    }
    else{
        res.json({message:"user not in database please sign"})
    }
        
})
io.on("connection", async (socket) => {
    try {
        await connec();
        console.log("A user connected");

        socket.on("route", async (route, user) => {
            const existingRoom = await messanger.findOne({ roomid: route });
            if (!existingRoom) {
                const newRoom = await messanger.create({
                    roomid: route,
                    messages: [{
                        user: user,
                        message: user + " joined",
                        time: Date.now(),
                        message_id: generateMessageId()
                    }]
                });
                await newRoom.save();
                console.log("New room created:", route);
            } else {
                console.log("Room already exists:", route);
            }
        });

        socket.on("connecting room", (route) => {
            socket.join(route);
            console.log("User joined room:", route);
        });

        socket.on("message", async (message, route, user) => {
            io.to(route).emit("show", message, user);
            await messanger.findOneAndUpdate({ roomid: route }, {
                $push: {
                    messages: {
                        user: user,
                        message: message,
                        time: Date.now(),
                        message_id: 9
                    }
                }
            });
        });
    } catch (error) {
        console.error("Socket.io error:", error);
    }
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
