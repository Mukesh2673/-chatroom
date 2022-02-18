const app = require('express')();
const http = require('http').createServer(app);
const io=require('socket.io')(http,{
    cors:{
        origin:['http://localhost:8080']
    }
});

const formatMessage=require('./utils/Messages')
const {userJoin,getCurrentUser,getRoomUsers}=require('./utils/users')


const botName='mukesh'
io.on('connection',(socket)=>{
console.log(`user ${socket.id} is connect`);


/* -----------------------------joiningRoom---------------------------- */

  socket.on('joinRoom', (data) => {
  const user = userJoin(socket.id, data.username, data.room);
  console.log('serverarray',user);
  
  const room = data.room.trim().toLowerCase();
  const username=data.username.trim().toLowerCase();
 
  console.log('username',user.usrname,'room',user.room);
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
    
 
    /* socket.on('disconnect',()=>{

      console.log(`${data.username} disconnected`);
      io.sockets.emit('newmessage',formatMessage('mukesh',`${data.username} has left Room `));
    
    }); */


 

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
 io.sockets.emit('newmessage',formatMessage('mukesh',data));
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on('pmessage',(data)=>{
  const to=data.reciever
 console.log('daeta',data);
console.log('sender',data.sender)
  let room = data.room.trim().toLowerCase();
  console.log('rec;',room);
  let t=getRoomUsers(room);

  console.log('data reciever',data.reciever);
 let nweArr=t.filter(t=>(t.username==data.reciever))
  console.log('beforefilter',t);
  console.log('fhi',nweArr);
let recieverid=nweArr.map(data=>(data.id));
console.log(recieverid[0]);
//send message to single user in same room  
console.log('senderdd')
io.to(recieverid[0]).emit('smessage',formatMessage(data.sender,'collect your data'));
  


});



  












 
      });
  


      



      http.listen(3000, () => {
        console.log('listeninghttp on *:3000');
      });







 
 















