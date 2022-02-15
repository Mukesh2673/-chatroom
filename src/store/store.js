import { createStore } from 'vuex'
const store = createStore({
    state () {
      return {
        currentuser: null
      }
    },
    mutations: {
      updateuser(state,payload) {
        console.log('payload',payload);
        state.currentuser=payload
      }
    }
  })
export default store
