<template>
  <div class="container">
    <TopBar />
    <Steps :currentStep="1" />
    <div class="cart-wrapper">
      <h3 class="title">
        <span>Twój koszyk <span v-if="getTotalItemsInCart">({{ getTotalItemsInCart }})</span></span>
        <span>
          <span class="title-text">Nie zwlekaj z zakupem, dodanie artykułów do koszyka nie oznacza ich rezerwacji</span>
        </span>
      </h3>
      <div v-if="!itemsInCart.length">
        <div class="d-flex justify-center">Twój koszyk jest pusty</div>
      </div>
      <div v-if="itemsInCart.length">
        <div v-for="(item, index) in itemsInCart"
             :key="index"
             class="cart-product">
          <div class="name-quantity">
            <div class="box">
              <div>
                <p class="list-title">Produkty</p>
                <div class="product-details">
                  <img src="../assets/images/ordered-product.svg" />
                  <div>
                    <p>
                      <span class="product-name">{{ item.product.name }}</span>
                      <span class="size">Rozmiar S</span>
                      <span class="delivery">Dostawa w 1-2 dni robocze</span>
                    </p>
                    <p class="details-actions">
                      <span><img src="../assets/images/close.svg" /> Usuń produkt</span>
                      <span><img src="../assets/images/heart.svg" /> Dodaj do ulubionych</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="box">
              <div>
                <p class="list-title">Ilość</p>
                <div class="quantity">
                  <button @click="decrementProductQuantity(item.product)">-</button>
                  <input type="number" v-model.number="item.quantity" min="1" max="10">
                  <button @click="incrementProductQuantity(item.product)">+</button>
                </div>
              </div>
            </div>
          </div>
          <div class="box price">
            <div>
              <p class="list-title">Wartość</p>
              <p class="price inverted">
                <span>{{ item.quantity * item.product.regularPrice | pln }}</span>
                <span>{{ item.quantity * item.product.price | pln }}</span>
              </p>
              <p class="discount">
                {{ 100 - ((item.product.price / item.product.regularPrice) * 100) }}% taniej
              </p>
            </div>
          </div>
        </div>
        <div class="checkout-btn-wrapper">
          <div class="discount">
            <div>
              <div class="code">Kod kuponu</div>
              <div class="code-apply">Zastosuj kupon</div>
            </div>
            <span class="amount">
             <span>Do zapłaty:</span> <span>{{ getTotalPriceInCart | pln }}</span>
          </span>
          </div>
        </div>
        <div class="submit-btn-wrapper">
          <div class="continue">
            <span>KONTYNUUJ ZAKUPY</span>
          </div>
          <button @click="goDelivery">Dostawa i płatność</button>
        </div>
        <BottomLogos />
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapMutations, mapState } from 'vuex'
import { ROUTING } from '../const/routing.const'
import BottomLogos from '../components/BottomLogos'
import Steps from '../components/Steps'
import { ToolsClass } from '../tools/Tools.class'
import TopBar from '../components/TopBar'

export default {
  name: 'Cart',
  components: { TopBar, Steps, BottomLogos },
  computed: {
    ...mapState({
      itemsInCart: state => state.cart.cartItems
    }),
    ...mapGetters({
      getTotalPriceInCart: 'getTotalPriceInCart',
      getTotalItemsInCart: 'getTotalItemsInCart'
    })
  },
  methods: {
    ...mapMutations([
      'REMOVE_PRODUCT_FROM_CART',
      'INCREMENT_PRODUCT_QUANTITY'
    ]),
    incrementProductQuantity (product) {
      this.INCREMENT_PRODUCT_QUANTITY(product)
    },
    decrementProductQuantity (product) {
      this.REMOVE_PRODUCT_FROM_CART(product)
    },
    goDelivery () {
      this.$router.push(ROUTING.delivery)
    }
  },
  created () {
    ToolsClass.scrollToElementTop(document.querySelector('header'))
  }
}
</script>
<style lang="scss" src="../scss/Cart.scss"></style>
