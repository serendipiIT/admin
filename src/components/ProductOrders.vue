<script>
  import axios from 'axios'
  import { OhVueIcon, addIcons } from 'oh-vue-icons'
  import { PrSpinner, IoCloseOutline, IoReloadOutline } from 'oh-vue-icons/icons'
  import { TransitionGroup } from 'vue'
  import { mapGetters } from 'vuex'
  import Modal from './OrderModal.vue'
  addIcons(PrSpinner, IoCloseOutline, IoReloadOutline)

  export default {
    components: { Modal, vIcon: OhVueIcon, TransitionGroup },
    data() {
      return {
        isModalVisible: false,
        orderModal: {},
        columnHeadings: ['Order Number', 'Ordered By', 'DATE'],
        search: null,
        orders: this.$store.state.orderList,
      }
    },
    computed: {
      ...mapGetters({
        getProductsOnOrder: 'getOrderedProducts',
        getSpecificOrder: 'getSpecificOrder',
      }),
      // orders() {
      //   return this.$store.state.orderList
      // },
    },
    methods: {
      openModal(order) {
        this.orderModal = order
        this.isModalVisible = true
      },
      closeModal(payload) {
        this.isModalVisible = payload
      },
      async removeOrder(id) {
        this.$refs[`element${id}`][0].$el.classList.remove('invisible')
        await axios.delete(`http://SITsApi.us-east-1.elasticbeanstalk.com/orders/${id}`).then((res) => console.log(res.data))
        this.$store.dispatch('getOrders').then((res) => (this.orders = res.data.data))
      },
    },
    watch: {
      search() {
        this.orders = this.getSpecificOrder(parseInt(this.search))
        if (this.search === '') {
          this.orders = this.$store.state.orderList
        }
      },
    },
  }
</script>
<template>
  <div class="componentTitle flex justify-between">
    <h1>Orders</h1>
    <div class="flex gap-4 items-center">
      <div class="relative">
        <input
          v-model="search"
          type="text"
          class="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Order Number"
        />
        <div class="absolute inset-y-0 pr-2 right-0 flex items-center">
          <vIcon name="io-close-outline" scale="1.6" class="cursor-pointer" @click="search = ''" />
        </div>
      </div>
      <vIcon name="io-reload-outline" fill="green" :hover="true" animation="spin" scale="1.5" class="cursor-pointer" @click="this.$store.dispatch('getOrders')" />
    </div>
  </div>
  <div class="componentCard">
    <table class="table table-auto w-full">
      <thead>
        <tr>
          <th v-for="(headings, index) in columnHeadings" :key="index">{{ headings.toUpperCase() }}</th>
        </tr>
      </thead>
      <tbody v-if="orders !== null" class="divide-y">
        <TransitionGroup>
          <tr v-for="order in orders" :key="order.order_id">
            <td>{{ order.order_id }}</td>
            <td>{{ order.name }} {{ order.surname }}</td>
            <td>{{ new Date(order.created_at).toLocaleString('sv-SE', { timeZone: 'GMT' }) }}</td>
            <td class="flex items-center justify-end gap-10">
              <button class="cursor-pointer border border-black py-2 px-6 rounded-3xl hover:bg-gray-800 hover:text-white transition-all" @click="openModal(order)">
                MORE INFO
              </button>
              <button
                class="cursor-pointer border border-black py-2 px-6 rounded-3xl hover:bg-red-600 hover:text-white transition-all"
                @click="removeOrder(order.order_id)"
              >
                REMOVE ORDER
              </button>
              <vIcon name="pr-spinner" scale="1.6" animation="spin" :ref="'element' + order.order_id" class="invisible" />
            </td>
          </tr>
        </TransitionGroup>
      </tbody>
      <tbody v-else>
        <tr>
          <td>No orders found</td>
        </tr>
      </tbody>
    </table>
  </div>

  <Modal :show="isModalVisible" @close="closeModal">
    <template #header>
      <h2 class="text-2xl">Order Number: {{ orderModal.order_id }}</h2></template
    >
    <template #body>
      <h3 class="mb-2 font-semibold">Customer Information:</h3>
      <ul class="[&>*]:mb-2">
        <li>Name: {{ orderModal.name }} {{ orderModal.surname }}</li>
        <li>E-mail: {{ orderModal.email }}</li>
        <li>Phone Number: {{ orderModal.phone }}</li>
        <li>Address: {{ orderModal.street }}</li>
        <li>City: {{ orderModal.city }}</li>
        <li>ZIP Code: {{ orderModal.postal_code }}</li>
        <li>Order placed at: {{ new Date(orderModal.created_at).toLocaleString('sv-SE', { timeZone: 'GMT' }) }}</li>
        <li class="flex gap-12 mt-12">
          <p class="self-center">Ordered Products:</p>
          <div class="flex gap-12">
            <li v-for="(products, index) in getProductsOnOrder(orderModal.order_id)" :key="index" class="flex flex-wrap flex-col items-center flex-1">
              <img :src="products.image" :alt="products.title" class="h-[10rem] object-contain rounded-xl" />
              <h3 class="text-center">{{ products.title }}</h3>
            </li>
          </div>
        </li>
      </ul>
    </template>
  </Modal>
</template>

<style>
  td {
    padding: 1rem 0;
    text-align: center;
  }
  tr:nth-child(even) {
    background-color: #dfdfdf;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
