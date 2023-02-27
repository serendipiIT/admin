<template>
  <div>
    <h1>Edit Product</h1>
  </div>
</template>

<script>
  export default {
    name: 'EditProducts',
    created() {
      if (this.products[0].id === 0) {
        this.products.shift()
      }
    },
    data: function () {
      return {
        columns: ['id', 'title', 'price', 'description', 'stock'],
        products: JSON.parse(this.$store.state.products),
      }
    },
    methods: {
      logStorage() {
        console.log(this.$store.state.products)
      },
    },
  }
</script>

<style lang="scss" scoped></style>
