<template>
  <div class="app">
    <div class="app-main">
      <AppHeader />
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>

import AppHeader from './components/Header'
import Footer from './components/Footer'
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  components: { Footer, AppHeader },
  methods: {
    ...mapMutations([
      'UPDATE_CART'
    ]),
    getCartDataFromStorage () {
      if (!JSON.parse(localStorage.getItem('cart'))) {
        return
      }
      const cart = JSON.parse(localStorage.getItem('cart'))
      this.UPDATE_CART(cart)
    }
  },
  created () {
    this.getCartDataFromStorage()
  }
}
</script>

<style src="./scss/App.scss" lang="scss"></style>
