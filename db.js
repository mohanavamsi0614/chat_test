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
const messanger=mongoose.model("messanger",schema)
// connect()
module.exports={connec:connect,messanger:messanger}