import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/Home.vue';
import GameRoom from '../components/GameRoom.vue';


const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/room/:roomName',
      name: 'GameRoom',
      component: GameRoom,
      props: true,
    },
  ];
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });
  
  export default router;