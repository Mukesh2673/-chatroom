<template>
  <div class="wholchat">
    <div class="container">
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
          <div class="btn btn-success leave">Leave Room</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 bg-dark text-light">
          <div>
            <i class="far fa-comments" style="font-size: 20px"></i>&nbsp;Room
            Name:
          </div>

          <select class="custom-select">
            <option selected>Select Room</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <div style="margin-left: -40px">
            <i class="fas fa-users" style="font-size:20px margin-left:20px"></i
            >Users
          </div>
          <div>Brad</div>
          <div>John</div>
        </div>

        <div class="col-md-8 chatbox">
          <div
            class="mt-3"
            style="background: gray"
            v-for="items in inbox"
            :key="items?.id"
          >
            {{ items }}
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
import { io } from "socket.io-client";
class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection(t) {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);

    //emit message to server
    this.socket.emit("my message", t);
    this.socket.on("message", (message) => {
      console.log("message:" + message);
    });
  }

   reply(newMessage) {
    this.socket.on("message", (x) => {
      console.log("om", x);
      newMessage.message = x;
        newMessage.inbox = [...newMessage.inbox, x];
    });
    console.log("hthjhsid", newMessage);
    return newMessage;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
let test = new SocketioService();

export default {
  setup() {},
  data() {
    return {
      message: "",
      inbox: [],
    };
  },
  methods: {
     dmessage() {
      let msg = this.message;
      this.inbox = [...this.inbox, msg];
      test.setupSocketConnection(msg);
     test.reply(this);
  
    },
  },

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
