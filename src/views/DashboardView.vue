<template>
  <main class="bg-gray-50 h-full bg-fixed">
    <div>
      <h1>Dashboard</h1>
    </div>
    <div class="componentCard">
      <h2>Welcome!</h2>
    </div>
    <div class="content grid grid-cols-2 gap-4">
      <div class="componentCard">
        <h2>Products</h2>
      </div>
      <div class="componentCard">
        <h2>Orders</h2>
      </div>
      <div class="componentCard">
        <h2>Marketing</h2>
      </div>
      <div class="componentCard">
        <h2>Customers</h2>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'DashboardView',
  }
</script>

<style lang="scss" scoped></style>

<!--

NAVBAR/Views

Dashbord

Webshop
- products
- categories
- Orders
- Customers

- Design
- Pages


 ProductsView.vue CategoriesView.vue OrdersView.vue CustomersView.vue DesignView.vue PagesView.vue



 -->
