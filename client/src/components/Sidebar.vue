<template>
  <div class="sidebar">
    <div class="menu">
      <ul>
        <li>
          Odzież
          <ul>
            <li class="active">T-shirty</li>
          </ul>
        </li>
        <li>Obuwie</li>
        <li>Torebki</li>
        <li>Biżuteria</li>
        <li>Akcesoria</li>
      </ul>
    </div>

    <div class="filter-wrapper" v-if="!filtersHidden">
      <p>Rozmiar</p>
      <div class="filter">
        <div>XS</div>
        <div>S</div>
        <div>M</div>
        <div>L</div>
      </div>
    </div>

    <div class="filter-wrapper" v-if="!filtersHidden">
      <p>Kolor</p>
      <div class="filter">
        <div>niebieski</div>
        <div>biały</div>
        <div>szary</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Sidebar',
  props: {
    filtersHidden: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" src="../scss/Sidebar.scss"></style>
