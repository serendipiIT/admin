<script>
  import SideNavbar from './components/SideNavbar.vue'
  export default {
    components: { SideNavbar },
  }
</script>

<template>
  <SideNavbar />
  <main class="ml-56 bg-gray-50 h-full p-8 bg-fixed">
    <RouterView />
  </main>
</template>
