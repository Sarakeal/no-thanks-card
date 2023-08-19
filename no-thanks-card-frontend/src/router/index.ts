import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import CreateRoom from '../pages/CreateRoom.vue'
import WaitRoom from '../pages/WaitRoom.vue'
import JoinRoom from '../pages/JoinRoom.vue'
import PlayRoom from '../pages/PlayRoom.vue'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/create-room',
    name: 'createRoom',
    component: CreateRoom
  },
  {
    path: '/wait-room',
    name: 'waitRoom',
    component: WaitRoom
  },
  {
    path: '/join-room',
    name: 'joinRoom',
    component: JoinRoom
  },
  {
    path: '/play',
    name: 'playRoom',
    component: PlayRoom
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
