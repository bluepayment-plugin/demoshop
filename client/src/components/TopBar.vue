<template>
  <div>
    <div class="top-bar-wrapper">
      <div>
        <span class="store-name">Blue shop</span>
      </div>
      <div>
        <div class="search">
          Szukaj
        </div>
        <div class="shopping-cart" @click="goToCart">
          <div class="counter" v-if="getTotalItemsInCart > 0">{{ getTotalItemsInCart }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { ROUTING } from '../const/routing.const'

export default {
  name: 'TopBar',
  computed: {
    ...mapGetters({
      getTotalItemsInCart: 'getTotalItemsInCart'
    })
  },
  methods: {
    goToCart () {
      this.$router.push(ROUTING.cart)
    }
  }
}
</script>

<style lang="scss" src="../scss/TopBar.scss"></style>
