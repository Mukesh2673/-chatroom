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
     //send message back to client
    io.sockets.emit('newmessage',formatMessage('mukesh',data));
  });

 
  





  socket.on('joinRoom', (data) => {
    console.log(data);
    const user = userJoin(socket.id, data.username, data.room);
    console.log('hi',user);

    socket.join(user.room);

    // Welcome current user
    socket.emit('newmessage', formatMessage('janu', 'Welcome to ChatCord!'));
    //socket.emit('mukesh', formatMessage('janu', 'Welcome to ChatCord!'));

    console.log('messagesend')
    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'newmessage',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
    
    

    
  });


















   //when user disconnect
    socket.on('disconnect',()=>{
      console.log('user disconnect');
      io.sockets.emit('newmessage',formatMessage('mukesh','user left'));
  })









 
      });
  
//Run when client disconnect

      



      http.listen(3000, () => {
        console.log('listeninghttp on *:3000');
      });







 
 















