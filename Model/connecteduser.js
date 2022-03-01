const mongoose=require('mongoose');
var Joinedusers=new mongoose.Schema({
username:{type:String},
room:{type:String},
socket_id:{type:String},
time : { type : Date, default: Date.now },
});
const joineduser=new mongoose.model("joinedusers",Joinedusers)
module.exports={joineduser}