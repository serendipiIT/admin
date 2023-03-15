<template>
  <div class="componentCard h-[50vh]">
  <h2>Sales</h2>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  export default {
    name: 'BarChart',
    components: { Bar },

    data() {
      return {
        chartData: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Sales',
              data: [12, 19, 3, 5, 2, 3, 12, 8, 15, 11, 19, 4],
              backgroundColor: ['rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        },
        chartOptions: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      }
    },
  }
</script>
