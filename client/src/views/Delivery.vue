<template>
  <div class="container">
    <Steps :currentStep="2" />
    <div class="delivery-wrapper">
      <div class="row">
        <div>
          <h3 class="title">
            Dane odbiorcy przesyłki
          </h3>
          <div class="radio-wrapper double">
            <div class="radio selected">
              <span>Osoba prywatna</span>
            </div>
            <div class="radio element-disabled">
              <span>Firma</span>
            </div>
          </div>
          <p>
            Jan Kowalski<br>
            Wrzosowa 46/76<br>
            76-567 Wrzosów
          </p>
          <p class="change-address element-disabled">
            <a>Zmień adres</a>
          </p>
          <div class="checkbox mt-20 element-disabled">
            Dostawa pod inny adres
          </div>
        </div>
        <div>
          <h3 class="title">
            Metoda płatności
          </h3>
          <div class="radio-wrapper">
            <div class="radio selected">
              <div>
                <span>Szybka płatność</span>
                <p>
                  Przelew internetowy, BLIK, karta płatnicza, Google Pay, Apple Pay
                </p>
              </div>
              <div>
                <img src="../assets/images/blue-media.svg" />
              </div>
            </div>
          </div>
          <div class="radio-wrapper element-disabled">
            <div class="radio">
              <div>
                <span>Zapłać przelewem</span>
              </div>
              <div>
                <img src="../assets/images/transfer.svg" />
              </div>
            </div>
          </div>
          <div class="radio-wrapper element-disabled">
            <div class="radio">
              <div>
                <span>Zapłać czekiem</span>
              </div>
              <div>
                <img src="../assets/images/check.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row with--summary">
        <div>
          <h3 class="title">
            Dostawa
          </h3>
          <div class="radio-wrapper">
            <div class="radio selected">
              <div>
                <span>Kurier DHL</span>
                <p>
                  Przewidywana dostawa w 1-2 dni robocze
                </p>
              </div>
              <div>
                <span>15,90 zł</span>
                <img src="../assets/images/dhl.svg" />
              </div>
            </div>
          </div>
          <div class="radio-wrapper element-disabled">
            <div class="radio">
              <div>
                <span>Paczkomat InPost</span>
              </div>
              <div>
                <span>11,90 zł</span>
                <img src="../assets/images/paczkomat.svg" />
              </div>
            </div>
          </div>
          <div class="radio-wrapper element-disabled">
            <div class="radio">
              <div>
                <span>Kurier InPost</span>
              </div>
              <div>
                <span>15,90 zł</span>
                <img src="../assets/images/kurier.svg" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <span class="summary-amount">
            <span>Do zapłaty:</span>
            <span>{{ getTotalPriceInCart | pln }}</span>
          </span>
        </div>
      </div>
      <div class="submit-btn-wrapper border-top">
        <div class="continue">
          <span>WRÓĆ DO KOSZYKA</span>
        </div>
        <button @click="goSummary">Przejdź do podsumowania</button>
      </div>
    </div>
  </div>
</template>

<script>

import Steps from '../components/Steps'
import { mapGetters } from 'vuex'
import { ROUTING } from '../const/routing.const'
import { ToolsClass } from '../tools/Tools.class'

export default {
  name: 'Delivery',
  components: { Steps },
  computed: {
    ...mapGetters({
      getTotalPriceInCart: 'getTotalPriceInCart'
    })
  },
  methods: {
    goSummary () {
      this.$router.push(ROUTING.summary)
    }
  },
  created () {
    ToolsClass.scrollToElementTop(document.querySelector('header'))
  }
}
</script>
<style lang="scss" src="../scss/Delivery.scss"></style>
