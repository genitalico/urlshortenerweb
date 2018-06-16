import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import All from '@/components/All'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/all',
      name: 'All',
      component: All
    }
  ]
})
