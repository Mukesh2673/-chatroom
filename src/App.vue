<template>
<div>
 <h1>welcome to Chat app</h1>
 <ChatRoom />
</div>
</template>

<script>
//import SocketioService from './service/socketio.service';
import ChatRoom from './components/chatRoom.vue'
export default {
  name: 'App',
  components: {
    ChatRoom
  },
/*   created(){
    SocketioService.setupSocketConnection();
  },
  beforeUnmount(){
    SocketioService.disconnect();
  } */
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
