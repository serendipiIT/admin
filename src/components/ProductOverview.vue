<template>
  <div>
    <table class="table table-auto w-full">
      <thead>
        <tr>
          <th v-for="column in columns" @click="reverseProducts(column)" :key="column.id">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product">
          <td class="p-2">{{ product.id }}</td>
          <td>{{ product.title.substring(0, 40) + '...' }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.description.substring(0, 40) + '...' }}</td>
          <td>{{ product.stock }}</td>
          <td>{{}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'ProductOverview',
    created() {
      /*      if (this.products[0].id === 0) {
        this.products.shift()
      }*/
    },
    data: function () {
      return {
        columns: ['id', 'title', 'price', 'description', 'stock'],
        products: JSON.parse(this.$store.state.products),
      }
    },
    methods: {
      logStorage() {
        console.log(this.$store.state.products)
      },
    },
  }
</script>

<style lang="scss" scoped>
  tr:nth-child(even) {
    background-color: #dfdfdf;
  }
</style>
