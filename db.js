const mongoose=require("mongoose")
require("dotenv").config()
async function connect() {
    await mongoose.connect(process.env.DATA_BASE_URI)
    console.log("connected")
}
const schema=mongoose.Schema({
    roomid:{type:String},
    messages:[
        {
            user:String,
            message:String,
            time:Date,
            user_id:String
        }
    ]
})
const mongoose=require("mongoose")
const user=mongoose.Schema({
    name:String,
    password:String,
    email:String,
    token:String
})
const usercoll=mongoose.model("user",user)
const messanger=mongoose.model("messanger",schema)
module.exports={connec:connect,messanger:messanger,user:usercoll}