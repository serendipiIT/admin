<template>
  <div>
    <ProductOverview />
    <button>Hämta ny data från servern</button>
  </div>
</template>

<script>
  import ProductOverview from '../components/ProductOverview.vue'
  export default {
    emits: ['showLoading', 'hideLoading'],
    name: 'ProductsView',
    components: {
      ProductOverview,
    },
    created() {
      this.$emit('showLoading')
      this.$store.dispatch('getProducts').then(() => {
        this.$emit('hideLoading')
      })
    },
  }
</script>

<style lang="scss" scoped></style>
