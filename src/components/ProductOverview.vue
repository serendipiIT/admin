<template>
  <div>
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
      <tbody>
        <tr v-for="product in products" :key="product">
          <td>
            <img :src="product.image" style="max-width: 50px" />
          </td>
          <td class="p-2">{{ product.id }}</td>
          <td><router-link :to="`/products/${product.id}`">{{ product.title.substring(0, 40) + '...' }}</router-link></td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.active === 1 ? 'Active' : 'Inactive' }}</td>
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
        columns: ['image', 'id', 'title', 'price', 'stock', 'active'],
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



</style>
