/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import cities from '@/components/cities'
import city from '@/components/city'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cities',
      name: 'cities',
      component: cities,
      children:[
        {
        path: ":city",
        name: "city",
        component:city
       }
      ]
    },
    {
      path: '/',
      redirect: '/cities'
    }
  ]
})
