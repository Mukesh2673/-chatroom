import { io } from 'socket.io-client';

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    //emit message to server
    this.socket.emit('my message','Hello there from afdsdflkadjfk');
    this.socket.on('message',(message)=>{
      console.log('message:'+message);
    });
  
  
  }
  disconnect(){
      if(this.socket){
          this.socket.disconnect();
      }
  }
  newjoiner(){
    console.log('hello new joiner');
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    this.socket.on("allmessage",'a new user join');
    //this.socket.broadcast ?.emit("allmessage", 'a new user join');
    
}


}
console.log('okkkk');
export default  SocketioService; 