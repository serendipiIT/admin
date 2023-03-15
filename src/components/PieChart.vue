<script>
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Pie } from 'vue-chartjs'
  import * as chartConfig from '../chartConfig.js'

  ChartJS.register(ArcElement, Tooltip, Legend)

  export default {
    name: 'App',
    components: {
      Pie,
    },
    data() {
      return chartConfig
    },
  }
</script>

<template>
  <div class="componentCard h-[50vh]">
    <h2>Products</h2>
    <Pie :data="data" :options="options" />
  </div>
</template>
