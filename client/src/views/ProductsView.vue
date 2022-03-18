<template>
  <div class="container">
    <TopBar />
    <TopMenu />
    <Breadcrumbs />
    <div class="main">
      <Sidebar />
      <Products />
    </div>
    <BottomLogos />
  </div>
</template>

<script>

import Sidebar from '../components/Sidebar'
import Products from '../components/Products'
import BottomLogos from '../components/BottomLogos'
import Breadcrumbs from '../components/Breadcrumbs'
import TopMenu from '../components/TopMenu'
import { ToolsClass } from '../tools/Tools.class'
import TopBar from '../components/TopBar'

export default {
  name: 'ProductsView',
  components: { TopBar, TopMenu, Breadcrumbs, BottomLogos, Products, Sidebar },
  created () {
    ToolsClass.scrollToElementTop(document.querySelector('header'))
  }
}
</script>

<style lang="scss" src="../scss/Products.scss"></style>
