<script>
  import SideNavbar from './components/SideNavbar.vue'
  export default {
    components: { SideNavbar },
  }
</script>

<template>
  <SideNavbar />
  <main class="ml-56 bg-gray-50 h-screen p-8">
    <RouterView />
  </main>
</template>
