const app = require('express')();
const http = require('http').createServer(app);
const io=require('socket.io')(http,{
    cors:{
        origin:['http://localhost:8080']
    }
});
app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection',(socket)=>{
    console.log('a user connect');
/*     socket.on('disconnect',()=>{
        console.log('user disconnected');
    }); */
    socket.on('my message',(msg)=>{
      console.log('message:'+msg);
    });
    socket.emit('message','Welcome to Chat');
});














http.listen(3000, () => {
  console.log('listeninghttp on *:3000');
});