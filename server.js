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
   
     //send message back to client
    io.sockets.emit('newmessage',formatMessage('mukesh',data));
  });

 
  





  socket.on('joinRoom', (data) => {

    const user = userJoin(socket.id, data.username, data.room);


    socket.join(user.room);

    // Welcome current user
    socket.emit('newmessage', formatMessage('janu', 'Welcome to ChatCord!'));
    //socket.emit('mukesh', formatMessage('janu', 'Welcome to ChatCord!'));

 
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
    

    socket.on('disconnect',()=>{
      let id=socket.id;
      const user = userLeave(socket.id);
      console.log('this is the current user',user);
      console.log(`${data.username} disconnected`);
      io.sockets.emit('newmessage',formatMessage('mukesh',`${data.username} has left Room `));
  
    
        
      //io.sockets.emit('remaininguser',user);
 
    });

  socket.emit("mik",'five');
 



    
  });



  socket.on('mike', (data) => {
      const user = userLeave(socket.id);
      console.log('joo',user);
      console.log(socket.id);
    socket.emit('remaining',user)
  })











   //when user disconnect
/*     socket.on('disconnect',(data)=>{
      console.log(data);
      console.log('user disconfnect',data);
      io.sockets.emit('newmessage',formatMessage('mukesh','user left'));
  })

 */







 
      });
  
//Run when client disconnect

      



      http.listen(3000, () => {
        console.log('listeninghttp on *:3000');
      });







 
 















