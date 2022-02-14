<template>

  <div class="wholchat">
    <div class="container mt-5">
      <div class="row bg-primary text-light top">
        <div class="headerb">
          <div class="left" style="display: flex">
            <div>
              <i
                class="fa fa-smile-o"
                aria-hidden="true"
                style="font-size: 30px"
              ></i>
           
            </div>
            <div class="apptitle mt-1">
    
              <h1 style="font-size: 20px">ChatBox</h1>
   
            </div>
          </div>
          <div class="btn btn-success leave" @click="leaveRoom">Leave Room</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 bg-dark text-light">
          <div>
            <i class="far fa-comments" style="font-size: 20px"></i>&nbsp;Room
            Name:
          </div>
           <div style="margin-left:25px"> 
          <select class="custom-select" v-model="selected" @change="kk">
             <option disabled value="">Room</option>
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
          </select>
          </div>
          <div style="margin-left: 0px">
            <i class="fas fa-users" style="font-size:20px margin-left:20px"></i
            >
            
            &nbsp;&nbsp;Users
           
          </div>
          <div style="margin-left:30px;display:flex" v-for="items in   usersd" :key="items.id">
            <div>{{items.username}}</div>
            <div><i class="fa fa-circle" style="font-size:10px;color:green;margin-left:10px"></i></div>
            



          </div>
        
        </div>

        <div class="col-md-8 chatbox">
          <div
            class="mt-3"
            style="background: gray"
            v-for="items in inbox"
            :key="items?.id"
          >
          <span style="font-size:10px; float:left;">{{items.username}} {{items.time}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp; {{ items.text }}
          
          </div>
        </div>
      </div>

      <div class="row smessage">
        <div class="align-self-center inputest text-light">
          <div style="width: 100%">
            <input type="text" style="width: 90%" v-model="message" />

            <button class="btn-primary" @click="dmessage">
              <i class="fab fa-telegram"></i>send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {ref} from 'vue';
import { io } from "socket.io-client";
export default {
  setup() {
 const socket=ref('')
 const currentuser=ref('')
socket.value = io(process.env.VUE_APP_SOCKET_ENDPOINT);
let t = JSON.parse(localStorage.getItem('login'));
currentuser.value=t.username;

                 socket.value.emit("joinRoom", t);
const test=()=>{
                  socket.value.on('mukesh',(dataf)=>{
                    console.log(dataf);
                    console.log('hi')

       });

}
test();


return {socket,test,currentuser}
  },
  data() {
    return {
      message:"",
      inbox: [],
      selected:'',
      k:'',
      roomusers:[],
      count:0,

    };
  },
  methods: {
     dmessage() {
      console.log('send message',this.message);
      let msg = this.message;
      this.socket.emit("mymessage", msg);
         this.socket.on('newmessage',(dataf)=>{
         this.k=dataf;
         this.message=''
         console.log(dataf);
 

       });

     },
 
   

  leaveRoom(){
     
      console.log(this.currentuser);
      let t=this.currentuser;
      console.log(t);
      this.socket.emit('mike');
      
      this.socket.on("remaining",(data)=>{
        console.log('hihihii');
        console.log(data);
      }
      );
       //this.socket.disconnect();
    
       
       //this.$router.push('/')
    },
    
    },
  
  

 created(){
   this.count++;
   console.log('count',this.count)
    this.socket.on('newmessage',(dataf)=>{
    this.k=dataf;
    this.message=''
    this.socket.on('roomUsers', ({ room, users }) => {
    console.log('room users list ',room,users);
      console.log(users);  
    this.roomusers=users;
 
});
    


 

       });
         

 },


 watch:{
    k(){
    
      this.inbox = [...this.inbox, this.k];
      console.log('roomusers',this.roomusers);
      
    },
    },
    computed:{
      usersd:function(){
        return this.roomusers;
      }
    }

    
};
</script>











<style scoped>
.wholchat {
  height: 150px;
}

.headerb {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.chatbox {
  height: 220px;
  overflow: scroll;
}
.headerb .leave {
  right: 0;
  background: red;
  justify-content: right;
}
.custom-select {
  background: blueviolet;
  color: white;
}
.smessage {
  background: blueviolet;
  display: flex;
  justify-content: space-around;
  height: 60px;
}
.inputest {
  display: flex;
}
</style>
