import { io } from 'socket.io-client';

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
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

}
console.log('okkkk');
export default new SocketioService(); 