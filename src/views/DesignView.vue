<template>
  <div>
    <h1>Design</h1>
    <OrderConfirmationMsg />
  </div>
</template>

<script>
  import OrderConfirmationMsg from '../components/OrderConfirmationMsg.vue'
  export default {
    name: 'DesignView',
    components: {
      OrderConfirmationMsg,
    },
  }
</script>

<style lang="scss" scoped></style>
