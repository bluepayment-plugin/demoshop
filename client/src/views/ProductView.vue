<template>
  <div class="container">
    <TopBar />
    <TopMenu />
    <Breadcrumbs :isSingleProduct="true" />
    <div class="main">
      <Sidebar :filters-hidden="true" />
      <Product />
    </div>
    <BottomLogos />
  </div>
</template>

<script>

import Sidebar from '../components/Sidebar'
import Product from '../components/Product'
import BottomLogos from '../components/BottomLogos'
import Breadcrumbs from '../components/Breadcrumbs'
import TopMenu from '../components/TopMenu'
import { ToolsClass } from '../tools/Tools.class'
import TopBar from '../components/TopBar'

export default {
  name: 'ProductView',
  components: { TopBar, TopMenu, Breadcrumbs, BottomLogos, Product, Sidebar },
  created () {
    ToolsClass.scrollToElementTop(document.querySelector('header'))
  }
}
</script>

<style lang="scss" src="../scss/Product.scss"></style>
