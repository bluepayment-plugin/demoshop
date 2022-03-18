import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './const/routing.const'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
