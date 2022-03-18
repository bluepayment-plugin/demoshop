<template>
  <div class="products">
    <div class="heading">
      <p class="category-name">T-shirty</p>
      <div>
        <span>Sortowanie domyślne</span>
      </div>
    </div>

    <div class="products-wrapper">
      <div class="single-product available" @click="goToProduct">
        <span class="additional">XS-XL</span>
        <img src="../assets/images/like-1.jpg" />
        <p>
          <span>Koszulka oversize</span>
          <span>80 zł</span>
        </p>
      </div>
      <div class="single-product">
        <span class="additional">XS-XL</span>
        <img src="../assets/images/like-1.jpg" />
        <p>
          <span>T-shirt z nadrukiem</span>
          <span>80 zł</span>
        </p>
      </div>
      <div class="single-product">
        <span class="additional">XS-XL</span>
        <img src="../assets/images/like-1.jpg" />
        <p>
          <span>T-shirt z nadrukiem</span>
          <span class="discount">
            <span>50 zł</span>
            <span>80 zł</span>
          </span>
        </p>
      </div>
      <div class="single-product">
        <span class="additional">XS-XL</span>
        <img src="../assets/images/like-1.jpg" />
        <p>
          <span>Koszulka oversize</span>
          <span>80 zł</span>
        </p>
      </div>
      <div class="single-product">
        <span class="additional">XS-XL</span>
        <img src="../assets/images/like-1.jpg" />
        <p>
          <span>Koszulka oversize</span>
          <span>80 zł</span>
        </p>
      </div>
      <div class="single-product">
        <span class="additional">XS-XL</span>
        <img src="../assets/images/like-1.jpg" />
        <p>
          <span>Koszulka oversize</span>
          <span>80 zł</span>
        </p>
      </div>
      <div class="single-product">
        <span class="additional">XS-XL</span>
        <img src="../assets/images/like-1.jpg" />
        <p>
          <span>Koszulka oversize</span>
          <span>80 zł</span>
        </p>
      </div>
      <div class="single-product">
        <span class="additional">XS-XL</span>
        <img src="../assets/images/like-1.jpg" />
        <p>
          <span>Koszulka oversize</span>
          <span>80 zł</span>
        </p>
      </div>
      <div class="single-product">
        <span class="additional">XS-XL</span>
        <img src="../assets/images/like-1.jpg" />
        <p>
          <span>Koszulka oversize</span>
          <span>80 zł</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import { ROUTING } from '../const/routing.const'

export default {
  name: 'Products',
  methods: {
    goToProduct () {
      this.$router.push(ROUTING.product)
    }
  }
}
</script>
