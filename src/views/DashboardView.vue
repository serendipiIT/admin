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
        <h2>Sales</h2>
        <BarChart :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </main>
</template>

<script>
import BarChart from '../components/BarChart.vue'
  export default {
    name: 'DashboardView',
    data() {
    return {
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Sales',
            data: [12, 19, 3, 5, 2, 3, 12, 8, 15, 11, 19, 4],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      chartOptions: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
  },
  components: {
    BarChart
  }
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
