<template>
  <div class="product">
    <div class="product-name">
      <p>{{ product.name }}</p>
      <div>
        <div class="reviews">
          <div>
            <img src="../assets/images/star.svg" />
            <img src="../assets/images/star.svg" />
            <img src="../assets/images/star.svg" />
            <img src="../assets/images/star.svg" />
            <img src="../assets/images/star-inactive.svg" />
          </div>
          <span class="reviews-count">(54)</span>
          <span>Dodaj opinię</span>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="left-side">
        <img src="../assets/images/t-shirt-mockup-1.jpg">
        <div class="thumbnails">
          <img src="../assets/images/t-shirt-mini-1.jpg" />
          <img src="../assets/images/t-shirt-mini-2.jpg" />
        </div>
      </div>
      <div class="right-side">
        <p class="promo">
          {{ 100 - ((product.price / product.regularPrice) * 100) }}% taniej
        </p>
        <p class="price">
          <span>{{ product.price | pln }}</span>
          <span>{{ product.regularPrice | pln }}</span>
        </p>
        <div class="sizes">
          <p>Rozmiar</p>
          <div class="sizes-wrapper">
            <div class="buttons">
              <button disabled>XS</button>
              <button class="selected">S</button>
              <button>M</button>
              <button>L</button>
              <button disabled>XL</button>
            </div>
            <a>Tabela rozmiarów</a>
          </div>
        </div>
        <div class="quantity">
          <p>Ilość</p>
          <div class="quantity-wrapper">
            <button @click="decrementProductQuantity()">-</button>
            <input type="number" v-model.number="quantity" min="1" max="10">
            <button @click="incrementProductQuantity()">+</button>
          </div>
        </div>
        <div class="add-to-cart-wrapper">
          <button class="add" @click="addToCart(product)">Dodaj do koszyka</button>
          <button class="wish"></button>
        </div>
        <div class="order-now">
          <p>
            <span>Zamów teraz – dostawa jutro</span>
            <span>100 dni na darmowy zwrot</span>
            <span>Dostępne metody płatności i dostawy</span>
          </p>
        </div>
      </div>
    </div>
    <div class="details">
      <h3>Opis produktu</h3>
      <p>
        Biała koszulka damska z krótkim rękawem i dużym, kontrastowym nadrukiem z logo Blue Media z przodu.
      </p>
      <h3>Skład i konserwacja</h3>
      <p>
        Materiał: 98% BAWEŁNA, 2% POLIESTER
      </p>
      <ul>
        <li>
          <img src="../assets/images/icon-warning-3.svg" />
          <span>prać w pralce z max. temp.30° c - proces łagodny</span>
        </li>
        <li>
          <img src="../assets/images/icon-warning-1.svg" />
          <span>nie bielić</span>
        </li>
        <li>
          <img src="../assets/images/icon-warning-5.svg" />
          <span>nie suszyć w suszarce bębnowej</span>
        </li>
        <li>
          <img src="../assets/images/icon-warning-4.svg" />
          <span>prasować w max. temp. 110° c - bez pary</span>
        </li>
        <li>
          <img src="../assets/images/icon-warning-2.svg" />
          <span>nie czyścić chemicznie</span>
        </li>
      </ul>
      <h3 class="also-like">Może Ci się też spodobać</h3>
      <div class="like-wrapper">
        <div>
          <span class="additional">34–42</span>
          <img src="../assets/images/like-1.jpg" />
          <p>
            <span>Jeansy high waist</span>
            <span>130 zł</span>
          </p>
        </div>
        <div>
          <span class="additional">XS–XL</span>
          <img src="../assets/images/like-2.jpg" />
          <p>
            <span>Bluza z kapturem</span>
            <span>150 zł</span>
          </p>
        </div>
        <div>
          <span class="additional">XS–XL</span>
          <img src="../assets/images/like-3.jpg" />
          <p>
            <span>Koszulka oversize</span>
            <span>80 zł</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex'
import { ROUTING } from '../const/routing.const'

export default {
  name: 'Product',
  data () {
    return {
      quantity: 1,
      product: {
        id: 1,
        price: 50.00,
        regularPrice: 80.00,
        name: 'T-shirt z nadrukiem'
      }
    }
  },
  methods: {
    ...mapMutations([
      'ADD_PRODUCT_TO_CART'
    ]),
    decrementProductQuantity () {
      while (this.quantity > 1) {
        this.quantity--
      }
    },
    incrementProductQuantity () {
      this.quantity++
    },
    addToCart (product) {
      this.ADD_PRODUCT_TO_CART({ product, quantity: this.quantity })
      this.$router.push(ROUTING.cart)
    }
  }
}
</script>

<style lang="scss" src="../scss/Product.scss"></style>
