<template>
  <div>
    <ProductOverview />
    <UpdateServer />
  </div>
</template>

<script>
  import ProductOverview from '../components/ProductOverview.vue'
  import UpdateServer from '../components/UpdateServer.vue'

  export default {
    name: 'ProductsView',
    components: {
      ProductOverview,
      UpdateServer,
    },
  }
</script>

<style lang="scss" scoped></style>
