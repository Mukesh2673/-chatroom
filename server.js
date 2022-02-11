const app = require('express')();
const http = require('http').createServer(app);
const io=require('socket.io')(http,{
    cors:{
        origin:['http://localhost:8080']
    }
});

const formatMessage=require('./utils/Messages')
const {userJoin,getCurrentUser,userLeave,getRoomUsers}=require('./utils/users')

const botName='mukesh'
io.on('connection',(socket)=>{
    console.log(`user ${socket.id} is connect`);


  //Recieve message
  socket.on('mymessage',data=>{
    console.log('message Recieved',data);
    io.sockets.emit('newmessage',formatMessage('mukesh',data));
  });

  //send message back to client
  



   //when user disconnect
    socket.on('disconnect',()=>{
      console.log('user disconnect');
  })









 
      });
  
//Run when client disconnect

      



      http.listen(3000, () => {
        console.log('listeninghttp on *:3000');
      });







 
 















