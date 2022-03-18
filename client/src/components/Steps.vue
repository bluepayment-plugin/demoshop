<template>
  <div class="steps-wrapper">
    <div class="line"></div>
    <div class="steps">
      <div class="main">
        <div class="step" :class="{'active': currentStep === 1 || currentStep === 2 || currentStep === 3}">
          <span>1</span>
          <span>Twój koszyk</span>
        </div>
        <div class="step" :class="{'active': currentStep === 2 || currentStep === 3}">
          <span>2</span>
          <span>Dostawa i płatność</span>
        </div>
        <div class="step" :class="{'active': currentStep === 3 }">
          <span>3</span>
          <span>Podsumowanie</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Steps',
  props: {
    currentStep: {
      default: 1,
      type: Number
    }
  }
}
</script>

<style lang="scss" src="../scss/Steps.scss"></style>
