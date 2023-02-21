<template>
  <nav class="fixed flex flex-col bg-gray-500 justify-center h-screen w-56">
    <routerLink :to="{ name: 'home' }">Dashboard</routerLink>
    <routerLink :to="{ name: 'Categories' }">Categories</routerLink>
    <routerLink :to="{ name: 'Orders' }">Orders</routerLink>
    <routerLink :to="{ name: 'Customers' }">Customers</routerLink>
    <routerLink :to="{ name: 'Design' }">Design</routerLink>
    <routerLink :to="{ name: 'Pages' }">Pages</routerLink>
  </nav>
</template>

<script>
  export default {
    name: "SideNavbar",
  }
</script>

<style lang="scss" scoped></style>
