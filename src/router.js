import Home from './components/Home.vue'
import Room from './components/chatRoom.vue'
import ChatUI from './components/ChatUI.vue'
import {createRouter,createWebHistory} from 'vue-router'
const routes=[{
    name:'ChatUI',
    component:Home,
    path:'/'

},
{
name:'Room',
component:Room,
path:'/chat'
}];
const router=createRouter({
    history:createWebHistory(),
    routes
});
export default router;