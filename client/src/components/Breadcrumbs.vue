<template>
  <div class="breadcrumbs-wrapper">
    <ul>
      <li>
        <img src="../assets/images/home-icon.svg" alt="Home icon" />
      </li>
      <li>/</li>
      <li>Kobiety</li>
      <li>/</li>
      <li>Odzieź</li>
      <li>/</li>
      <li>T-shirty</li>
      <li v-if="isSingleProduct">/</li>
      <li v-if="isSingleProduct">T-shirt z nadrukiem</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Breadcrumbs',
  props: {
    isSingleProduct: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style lang="scss" src="../scss/Breadcrumbs.scss"></style>
