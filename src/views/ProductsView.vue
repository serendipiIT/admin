<template>
  <div>
    <h1>Products</h1>
    <EditProducts />
  </div>
</template>

<script>
  import EditProducts from '../components/EditProducts.vue'
  export default {
    name: 'ProductsView',
    components: {
      EditProducts,
    },
  }
</script>

<style lang="scss" scoped></style>
