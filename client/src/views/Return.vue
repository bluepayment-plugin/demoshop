<template>
  <div class="container">
    <div class="return-wrapper">
      <div class="loader" v-if="processing">
        <TransactionLoader />
        <p>
          Weryfikujemy status Twojej płatności
        </p>
      </div>
      <div class="success-wrapper" v-if="isSuccess()">
        <TransactionSuccess />
        <p>Zamówienie na kwotę {{ parseFloat(amount) | pln }} zostało opłacone</p>
      </div>
      <div class="error-wrapper" v-if="isError()">
        <TransactionError />
        <p>Nie udało się opłacić zamówienia na kwotę {{ parseFloat(amount) | pln }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ToolsClass } from '../tools/Tools.class'
import axiosInstance from '../api/axios'
import { ENDPOINTS } from '../const/endpoints.const'
import { TRANSACTION_STATUSES } from '../const/transactionStatuses.const'
import TransactionLoader from '../components/TransactionLoader'
import TransactionSuccess from '../components/TransactionSuccess'
import TransactionError from '../components/TransactionError'

export default {
  name: 'Return',
  components: { TransactionError, TransactionSuccess, TransactionLoader },
  data () {
    return {
      statusCheckHandler: null,
      processing: true,
      status: null,
      amount: null
    }
  },
  methods: {
    checkStatusData () {
      const payload = {
        orderId: this.$route.query.OrderID
      }

      axiosInstance.post(ENDPOINTS.status, payload)
        .then(response => {
          const { status, amount } = response?.data?.transaction || {}

          this.status = status
          this.amount = amount

          if (status === TRANSACTION_STATUSES.success || status === TRANSACTION_STATUSES.error) {
            clearTimeout(this.statusCheckHandler)
            this.processing = false
          }
        })
        .catch(error => {
          console.log(error)
        })

      this.statusCheckHandler = setTimeout(() => {
        this.checkStatusData()
      }, 3000)
    },
    isSuccess () {
      return this.status === TRANSACTION_STATUSES.success
    },
    isError () {
      return this.status === TRANSACTION_STATUSES.error
    }
  },
  created () {
    this.checkStatusData()
    ToolsClass.scrollToElementTop(document.querySelector('header'))
  }
}
</script>
<style lang="scss" src="../scss/Return.scss"></style>
