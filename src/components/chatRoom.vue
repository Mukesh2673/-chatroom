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
          <div style="display:flex; justify-content:space-between">
            <div>
            <i class="far fa-comments" style="font-size: 20px"></i>&nbsp;Room
            Name:
            </div>
            <div>
              Room:{{this.room}}
            </div>
          <div style="position:relative" class="mt-2" @click="singmessages">
           <i class="far fa-comment " style="font-size: 20px; font-weight: bold; color:yellow"></i>

           <div style="postion:absolute; margin-top:-40px;margin-left:5px; font-size:25px;color:red;font-weight: bold;" v-if="notification>0">{{notification}}</div>
          
          </div> 
          
          
            <div>
               <i class="fas fa-user" style="font-size:20px margin-left:20px"></i
            >
              {{this.currentuser}}
            </div>
            
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
            <div @click="singleuser">{{items.username}}</div>
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


<!-- Modal -->
<div class="modal"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" :style="{display:[p_display]}">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
          <div style="display:flex; justify-content:space-between">
         
           
            <div>
               <i class="fas fa-user" style="font-size:20px margin-left:20px"></i
            >
              {{this.P_user}}
            </div>
            
          </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="p_display='none'"></button>
      </div>

  
<div class="modal-body">
  <div style="display:flex; flex-direction:column;text-align:center">
    
<div ref="scrollp">
   <div
            class="mt-3"
            style="background: gray"
            v-for="items in P_inbox"
            :key="items?.id"
          >
          <span style="font-size:10px; float:left;">{{items}} {{items.time}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp; {{ items }}
          
          </div>
  </div>
  <br> <br> <br> <br> <br> <br> <br>
</div>
</div>  











      <div class="modal-footer">
        <input type="text" style="width: 100%" v-model="P_message"    @keyup.enter="pmessage"  />
        <button class="btn-primary" @click="pmessage">
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
import {useStore} from 'vuex'
export default {
  setup() {
  const store=useStore()
 const socket=ref('')
 const currentuser=ref('')
 const roomusers=ref([])
 const room=ref('')
 const notification=ref(0)
 const  P_user=ref('')
 const  P_inbox=ref([])

let  v=store.state.currentuser?.username
currentuser.value=v;


socket.value = io(process.env.VUE_APP_SOCKET_ENDPOINT);
let t = JSON.parse(localStorage.getItem('login'));
currentuser.value=t.username;
room.value=t.room
                 socket.value.emit("joinRoom", t);

socket.value.on('testcase',(t)=>{
  console.log('hellotester',t);
  roomusers.value=t;
});

socket.value.on("smessage",(data)=>{
             if(data){
               notification.value+=1;
               P_user.value=data.username;
              P_inbox.value=[...P_inbox.value,data.text]
             }
             console.log('huu',data);

        });


return {socket,currentuser,roomusers,room,notification,P_user,P_inbox}
  },
  data() {
    return {
      message:"",
      inbox: [],
      selected:'',
      k:'',
      p:'',
      currentuser:'',
     
      p_display:'none',
     
   
     P_message:"",
     singmessage:false

    
    };
  },
  methods: {
     dmessage() {
      let msg = this.message;
      this.socket.emit("mymessage", msg);
         this.socket.on('newmessage',(dataf)=>{
         this.k=dataf;
         this.message=''
      });

     },
    pmessage(){
        this.P_inbox=[...this.P_inbox,this.P_message]
      
        this.$refs.scrollp?.lastElementChild?.scrollIntoView()
        this.socket.emit("pmessage", {reciever:this.P_user,sender:this.currentuser,message:this.P_message,room:this.room});
        this.P_message=""
        this.socket.on("smessage",(data)=>{
        this.p=data;

        });
      
      },
      singmessages(){
        
        console.log('hiii');
        this.p_display='block'



      },
 
   

  leaveRoom(){
      let t=this.currentuser;
      this.socket.emit('mike',t);
      this.socket.on("testcase",(data)=>{
      this.roomusers=data;
      }
      );
       this.$router.push('/')
    },
  singleuser(e){
         this.P_user=e.target.innerHTML
         this.p_display='block'
     }


    
    },
  
  

 created(){
  
    this.socket.on('newmessage',(dataf)=>{
    this.k=dataf;
    this.message=''
    this.socket.on('roomUsers', ({ room, users }) => {
    this.roomusers=users;
 
});
    


 

       });
         

 },


 watch:{
    k(){
    
      this.inbox = [...this.inbox, this.k];
      
    },
    p(){
      console.log(this.p);
    }
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
