const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const cors = require('cors'); 
const {messanger}=require("./db")
const {connec}=require("./db");
const { default: mongoose } = require('mongoose');
const io = new Server(http, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST',"PUT",],
        credentials: true
    }
});
app.use(cors());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});
app.get("/:room",(req,res)=>{
    res.sendFile(__dirname + '/frontend/index.html')
})
app.get("/data:room",async (req,res)=>{
    const data=await messanger.findOne({roomid:req.params.room})
    res.json(data)
})
io.on("connection", async (socket) => {
    await connec()
    console.log("A user connected");
    socket.on("route",async (route,user)=>{
        const check= await messanger.findOne({roomid:route})
        console.log(check)
        if (!check){
            console.log("creating")
            const mess=await messanger.create({
            roomid:route,
            messages:[
                {
                    user:user,
                    message:user+"joined",
                    time:Date.now(),
                    message_id:user+this.time
                }
            ]
        })
        await mess.save()
        console.log("dwqbk")
        socket.join(route);
    }
    else{
        console.log("hey i got you");
    }
    });
    socket.on("connecting room",(route)=>{
        socket.join(route)
    })
    socket.on("message", async (message,route,user) => {
        io.to(route).emit("show", message,user);
       await messanger.findOneAndUpdate({roomid:route},
        {$push:{messages:{user:user,message:message,time:Date.now(),message_id:user+this.time}}})
    });
});

const PORT = 3030;
http.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// app.listen(3000)