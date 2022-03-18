import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import filterPln from './filters/pln'

Vue.filter('pln', filterPln)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
