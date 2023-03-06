<template>
  <div class="componentCard">
    <table class="table table-auto w-full">
      <thead>
        <tr>
          <th v-for="column in columns" @click="reverseProducts(column)" :key="column.id">
           <td>
             {{ column }}
           </td>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-500">
        <tr class="h-2">
          <td>product</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'ProductOverview',
    created() {
      if (this.products) {
        if (this.products[0].id === 0) {
          this.products.shift()
        }
      }
    },
    data: function () {
      return {
        columns: ['IMAGE', 'ID', 'TITLE', 'PRICE', 'STOCK', 'ACTIVE'],
        /*products: this.$store.state.products,*/
        products: JSON.parse(localStorage.getItem('products')),
      }
    },
    methods: {

    },
  }
</script>

<style lang="scss" scoped>
  tr:nth-child(even) {
    background-color: #dfdfdf;
  }

  th, td {
  padding: 0.5rem 0;
}

img {
  height: 3rem;
  margin: auto;
}


</style>
