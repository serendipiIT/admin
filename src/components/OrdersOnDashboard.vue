<script>
  import Modal from './OrderModal.vue'
  export default {
    data() {
      return {
        isModalVisible: false,
        orderModal: {},
      }
    },
    components: { Modal },
    computed: {
      orders() {
        let vuex = this.$store.state.orderList
        return vuex.filter((order) => new Date(Date.parse(order.created_at)).toDateString() === new Date().toDateString()) //'Mar 14, 23'
      },
    },
    methods: {
      openModal(order) {
        this.orderModal = order
        this.isModalVisible = true
      },
      closeModal(payload) {
        this.isModalVisible = payload
      },
    },
  }
</script>
<template>
  <div class="componentCard h-[50vh] overflow-i-scroll">
    <h2>Today's Orders</h2>
    <ul v-if="orders.length > 0">
      <li
        v-for="order in orders"
        :key="order.id"
        class="border py-4 mt-2 first:border-t cursor-pointer flex hover:shadow transition-all rounded-lg"
        @click="openModal(order)"
      >
        <p class="px-4">
          Order {{ order.order_id }} was placed at {{ new Date(order.created_at).toLocaleString('sv-SE', { timeZone: 'GMT' }).slice(11, 19) }} by {{ order.name }}
          {{ order.surname }}
        </p>
      </li>
    </ul>
    <h3 v-else class="text-center mt-36">No orders placed today!</h3>
  </div>
  <Modal :show="isModalVisible" @close="closeModal" :order="orderModal" />
</template>
