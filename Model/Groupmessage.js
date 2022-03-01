const mongoose=require('mongoose');
var groupmessage=new mongoose.Schema({
Sender:{type:String},
Message:{type:String},
time : { type : Date, default: Date.now }
});
const groupmessages=new mongoose.model("groupmessages",groupmessage)
module.exports={groupmessages}