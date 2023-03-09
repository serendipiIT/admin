<template>
  <div>
    <ProductOverview />
    <button @click="$store.dispatch('getProducts')">Hämta ny data från servern</button>
  </div>
</template>

<script>
  import ProductOverview from '../components/ProductOverview.vue'
  export default {
    name: 'ProductsView',
    components: {
      ProductOverview,
    },
  }
</script>

<style lang="scss" scoped></style>
