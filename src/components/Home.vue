<template>
<div class="d-flex parent" >

<div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title text-center" >ChatRoom</h5>
    <form method="post" @submit.prevent="login">
    <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required>
    </div>
    <div>
        <label for="Room">Room</label><br>
            <select class="selectRoom" v-model="selected" id="Room" required>
             <option disabled value="">Room</option>
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
          </select>
    </div>
    <div><button class="btn btn-primary mt-2" type="submit">Join Chat</button></div>
   </form> 
    
  </div>
</div>








</div>
</template>

<script>
import { io } from "socket.io-client";



export default{
    setup() {
        
    },
    data(){
        return{
            username:'',
            selected:'',
            text:"",
            message:[],
            socket:""
        }
    },
       methods: {
           login(){
                 console.log(this.username,this.selected);
                 let d={'username':this.username,'room': this.selected}
                 localStorage.setItem("login", JSON.stringify(d));
                 this.$store.commit('updateuser',d)

                 this.$router.push('/chat')
                  
                  
                  //this.socket.emit("mymessage", msg);
               },
              
            
              },
               

    
}
</script>

<style  scoped>
input{
    width: 100%;
}
.card{  
    background: blueviolet;
    color:white;

    }
.selectRoom{
    width:100%;
    height: 30px;

}
.btn{
    width: 100%;
}
.btn:hover{
    height: 50px;
    margin-top: 20px;
}
.parent{
    display: flex;
    justify-content: space-around;
    margin-top:10%;
}

</style>