import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import CreateRoom from '../pages/CreateRoom.vue'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/create-room',
    name: 'create room',
    component: CreateRoom
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
