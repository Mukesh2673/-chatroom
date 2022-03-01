const mongoose=require('mongoose');
var Personalmessage=new mongoose.Schema({
Sender:{type:String},
Message:{type:String},
Reciever:{type:String},
time : { type : Date, default: Date.now },
Room:{type:String}
});
const Personalmessages=new mongoose.model("personalmessage",Personalmessage)
module.exports={Personalmessages}