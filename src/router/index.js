import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Single from '@/components/Single'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/single/',
      name: 'Single',
      component: Single
    }
  ]
})
