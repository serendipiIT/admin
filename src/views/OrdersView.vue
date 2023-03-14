<script>
  import Orders from '../components/ProductOrders.vue'
  export default {
    emits: ['showLoading', 'hideLoading'],
    name: 'OrdersView',
    components: {
      Orders,
    },
    created() {
      this.$emit('showLoading')
    },
    methods: {
      hide() {
        this.$emit('hideLoading')
      },
    },
  }
</script>

<template>
  <div>
    <Orders @hide-loading="hide" />
  </div>
</template>
