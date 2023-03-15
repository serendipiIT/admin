<script>
  import { mapGetters } from 'vuex'

  export default {
    emits: ['close'],
    computed: {
      ...mapGetters({
        getProductsOnOrder: 'getOrderedProducts',
      }),
    },
    props: {
      show: Boolean,
      order: {
        type: Object,
        default: null,
      },
    },
  }
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="z-50 fixed top-0 left-0 w-full h-full flex transition-opacity duration-300 ease-linear bg-[rgba(0,0,0,0.5)]">
      <div class="min-w-[30vw] max-w-[50%] m-auto p-12 bg-white border shadow-2xl transition-all duration-300 ease-linear rounded-3xl">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-2xl">Order Number: {{ order.order_id }}</h2>
          <button class="border py-2 px-6 rounded-full bg-gray-100 hover:bg-gray-800 hover:text-white transition-all" @click="$emit('close', false)">CLOSE</button>
        </div>

        <div>
          <h3 class="mb-2 font-semibold">Customer Information:</h3>
          <ul class="[&>*]:mb-2">
            <li>Name: {{ order.name }} {{ order.surname }}</li>
            <li>E-mail: {{ order.email }}</li>
            <li>Phone Number: {{ order.phone }}</li>
            <li>Address: {{ order.street }}</li>
            <li>City: {{ order.city }}</li>
            <li>ZIP Code: {{ order.postal_code }}</li>
            <li>Order placed at: {{ new Date(order.created_at).toLocaleString('sv-SE', { timeZone: 'GMT' }) }}</li>
            <li class="flex gap-12 mt-12">
              <p class="self-center">Ordered Products:</p>
              <div class="flex gap-12">
                <li v-for="(products, index) in getProductsOnOrder(order.order_id)" :key="index" class="flex flex-wrap flex-col items-center flex-1">
                  <img :src="products.image" :alt="products.title" class="h-[10rem] object-contain rounded-xl" />
                  <h3 class="text-center">{{ products.title }}</h3>
                </li>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
  .modal-enter-from {
    opacity: 0;
  }

  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
