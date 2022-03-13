import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import DynastyPage from '@/views/dynasty'
import PoetryPage from '@/views/poetry'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/dynasty',
        name: '朝代',
        component: DynastyPage,
      },
      { path: '/', name: '诗词', component: PoetryPage },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
