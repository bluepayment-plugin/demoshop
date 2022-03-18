<template>
  <header>
    <div class="container">
      <div class="header-main">
        <div class="logo-wrapper" @click="goToHomePage">
          <div class="logo"></div>
          <span>DEMO</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ROUTING } from '../const/routing.const'

export default {
  name: 'AppHeader',
  methods: {
    goToHomePage () {
      if (this.$route.path === ROUTING.start) {
        return
      }
      this.$router.push(ROUTING.start)
    }
  }
}
</script>

<style lang="scss" src="../scss/Header.scss"></style>
