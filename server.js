const express=require("express")
const app = express();
var cors=require('cors');
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
var bodyParser = require('body-parser')
app.use(bodyParser.json())
const http = require('http').createServer(app);
const io=require('socket.io')(http,{
    cors:{
        origin:['http://localhost:8080'],
        Credential:true
    }
});
const {groupmessages}=require("./Model/Groupmessage");
const {Personalmessages}=require("./Model/Personalmessage")
const {joineduser}=require("./Model/connecteduser")
const mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/realtimechat';
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("connection Success Full"))
.catch((err)=>console.log(err));
const formatMessage=require('./utils/Messages')
const {userJoin,getCurrentUser,getRoomUsers}=require('./utils/users')
const botName='mukesh'
io.on('connection',(socket)=>{
console.log(`user ${socket.id} is connect`);
app.post('/groupmessages',async(req,res)=>{
  const alldata=await groupmessages.find({});
  res.send(alldata);
});
app.post('/personalmessages',async(req,res)=>{
    let sender=req.body.sender;
    let reciever=req.body.reciever;
    const pdata=await Personalmessages.find({Sender:sender, Reciever:reciever});
    res.send(pdata);
    //const pmessage=await groupmessages.find({})

})







/* -----------------------------joiningRoom---------------------------- */

  socket.on('joinRoom', (data) => {
  const user = userJoin(socket.id, data.username, data.room);
  const joinedusers=new joineduser({
    username:data.username,
    room:data.room,
    socket_id:socket.id
  });
  joinedusers.save(function(err){
  if(err){
    console.log(err);
  }
  });
  const room = data.room.trim().toLowerCase();
  const username=data.username.trim().toLowerCase();
  socket.join(room,username);
  // Welcome current user
  socket.emit('newmessage', formatMessage(username, 'Welcome to ChatCord!'));

 
    // Broadcast when a user connects
  socket.broadcast
      .to(room)
      .emit(
        'newmessage',
        formatMessage(botName, `${username} has joined the chat`)
      );  

    // Send users and room info
  io.to(room).emit('roomUsers', {
      room: room,
      users: getRoomUsers(room)
    });
    
 
    

 

  socket.on('mike', (data) => {
    const user = userLeave(socket.id);
    console.log('joo',user);
    console.log(socket.id);
    io.sockets.emit('testcase',user);

})
});   







//Recieve message
socket.on('mymessage',data=>{
//send message back to client
const igroupmessages=new groupmessages({
  Sender:data.sender,
  Message:data.message
});
igroupmessages.save(function(err){
if(err){
  console.log(err);
}
});

io.sockets.emit('newmessage',formatMessage(data.sender,data.message));
});

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on('pmessage',(data)=>{
    const Personalmessage=new Personalmessages({
      Sender:data.sender,
      Reciever:data.reciever,
      Message:data.message,
      Room:data.room
    });
    Personalmessage.save(function(err){
      if(err){
        console.log(err);
      }
      });

const to=data.reciever
let room = data.room.trim().toLowerCase();
let t=getRoomUsers(room);
let nweArr=t.filter(t=>(t.username==data.reciever))
let recieverid=nweArr.map(data=>(data.id));
//send message to single user in same room  
io.to(recieverid[0]).emit('smessage',formatMessage(data.sender,'collect your data'));
});
 });
      http.listen(3000, () => {
        console.log('listeninghttp on *:3000');
      });







 
 















