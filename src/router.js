import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Chart from './views/Chart.vue'
import System from './views/System.vue'
import AddCurrency from './views/AddCurrency.vue'
import ServersView from './views/ServersView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/system',
      name: 'system',
      component: System
    },
    {
      path: '/add-currency',
      name: 'add-currency',
      component: AddCurrency
    },
    {
      path: '/chart',
      name: 'chart',
      component: Chart
    },
    {
      path: '/servers/:server',
      name: 'servers',
      component: ServersView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
