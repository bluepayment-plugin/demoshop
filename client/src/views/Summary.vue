<template>
  <div class="container">
    <Steps :currentStep="3" />
    <div class="summary-wrapper">
      <div class="row">
        <div>
          <h3 class="title">
            Zamówienie
          </h3>
          <div class="product-details summary" v-for="(item, index) in itemsInCart" :key="index">
            <div class="prod">
              <img src="../assets/images/ordered-product.svg" />
              <p>
                <span class="product-name">{{ item.product.name }}</span>
                <span class="size">Rozmiar S</span>
                <span class="delivery">Dostawa w 1-2 dni robocze</span>
              </p>
            </div>
            <div class="prod-price">
              <p class="price inverted">
                <span>{{ item.quantity * item.product.regularPrice | pln }}</span>
                <span>{{ item.quantity * item.product.price | pln }}</span>
              </p>
              <p class="promo summary-promo">
                {{ 100 - ((item.product.price / item.product.regularPrice) * 100) }}% taniej
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 class="title">
            Dane odbiorcy przesyłki
          </h3>
          <p>
            Jan Kowalski<br>
            Wrzosowa 46/76<br>
            76-567 Wrzosów
          </p>
          <br>
          <h3 class="title mt">
            Dostawa
          </h3>
          <div class="radio-wrapper">
            <div class="radio selected">
              <div>
                <span>Kurier DHL</span>
                <p>Przewidywana dostawa w 1-2 dni robocze </p>
              </div>
              <div>
                <span>15,90 zł</span>
                <img src="../assets/images/dhl.svg" />
              </div>
            </div>
          </div>
          <br>
          <h3 class="title mt">
            Metoda płatności
          </h3>
          <div class="radio-wrapper">
            <div class="radio selected">
              <div>
                <span>Szybka płatność</span>
                <p>Przelew internetowy, BLIK, karta płatnicza, Google Pay, Apple Pay</p>
              </div>
              <div>
                <img src="../assets/images/blue-media.svg" />
              </div>
            </div>
          </div>
          <br>
          <div class="summary-details">
            <p>
              <span>suma zamówienia:</span>
              <span>{{ getTotalPriceInCart | pln }}</span>
            </p>
            <p>
              <span>dostawa:</span>
              <span>15,90 PLN</span>
            </p>
            <p>
              <span>do zapłaty łącznie (brutto):</span>
              <span class="amount-to-pay">{{ getTotalPriceInCart + deliveryAmount | pln }}</span>
            </p>
            <p class="save">
              <span>oszczędzasz:</span>
              <span>{{ getTotalAmountWithDiscountApplied | pln }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="submit-btn-wrapper checkout border-top">
        <div>
          <div class="continue">
            <span @click="goHome">WRÓĆ DO SKLEPU</span>
          </div>
          <div>
            <p>
              Składając zamówienie na BlueShop, akceptujesz <a>Postanowienia Polityki Prywatności</a>,
              <a>Regulamin</a> oraz zasady odstąpienia od umowy.
            </p>
          </div>
        </div>
        <button @click="checkout" :disabled="processing">
          <span>Potwierdź i zapłać używając Blue Media</span>
          <i class="loader" v-if="processing"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import Steps from '../components/Steps'
import { ROUTING } from '../const/routing.const'
import { ToolsClass } from '../tools/Tools.class'
import { mapState, mapGetters, mapMutations } from 'vuex'
import axiosInstance from '../api/axios'
import { ENDPOINTS } from '../const/endpoints.const'

export default {
  name: 'Summary',
  data () {
    return {
      deliveryAmount: 15.90,
      processing: false
    }
  },
  components: { Steps },
  computed: {
    ...mapState({
      itemsInCart: state => state.cart.cartItems
    }),
    ...mapGetters({
      getTotalPriceInCart: 'getTotalPriceInCart',
      getTotalAmountWithDiscountApplied: 'getTotalAmountWithDiscountApplied'
    })
  },
  methods: {
    ...mapMutations([
      'UPDATE_CART'
    ]),
    goHome () {
      this.$router.push(ROUTING.start)
    },
    checkout () {
      const payload = {
        amount: this.getTotalPriceInCart + this.deliveryAmount,
        email: 'demoshop@bm.pl'
      }

      this.processing = true
      axiosInstance.post(ENDPOINTS.buy, payload)
        .then(response => {
          const { redirectUrl } = response?.data || {}

          if (typeof redirectUrl === 'string' && redirectUrl.length) {
            this.UPDATE_CART(null)
            localStorage.removeItem('cart')
            window.location.href = redirectUrl
          }
        })
        .catch(error => {
          console.log('err', error)
        })
        .finally(() => {
          this.processing = false
        })
    }
  },
  created () {
    ToolsClass.scrollToElementTop(document.querySelector('header'))
  }
}
</script>
<style lang="scss" src="../scss/Summary.scss"></style>
