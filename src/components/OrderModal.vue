<script>
  export default {
    emits: ['close'],
    props: {
      show: Boolean,
    },
  }
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="z-50 fixed top-0 left-0 w-full h-full flex transition-opacity duration-300 ease-linear bg-[rgba(0,0,0,0.5)]">
      <div class="min-w-[50%] m-auto p-12 bg-white border shadow-2xl transition-all duration-300 ease-linear rounded-3xl">
        <div class="flex items-center justify-between mb-2">
          <slot name="header">HEADER</slot>
          <button class="border py-2 px-6 rounded-full bg-gray-100 hover:bg-gray-800 hover:text-white transition-all" @click="$emit('close', false)">CLOSE</button>
        </div>

        <div>
          <slot name="body">BODY</slot>
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
