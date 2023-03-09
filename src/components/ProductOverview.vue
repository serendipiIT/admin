<template>
  <div class="componentTitle flex justify-between">
    <h1>Products</h1>
    <router-link :to="`/create`"><button class="button-68 greenW" role="button">Add Product</button></router-link>
  </div>
  <div class="componentCard">
    <table class="table table-auto w-full">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.id" @click="$store.commit(`sortBy${column}`)">
           <td>
             {{ column.toUpperCase() }}
           </td>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-500">
        <tr class="h-2" v-for="product in productPage(currentPage)" :key="product">
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
    <div class="mt-4 flex flex-row justify-between px-10">

      <button :disabled="currentPage > 1 ? false : true" @click="$router.push(`/products?page=${currentPage - 1}`)">Previous</button>
      <button :disabled="currentPage < lastPage ? false : true" @click="$router.push(`/products?page=${currentPage + 1}`)">Next</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';



export default {
  name: 'ProductOverview',
  computed: {
    ...mapGetters({
        productPage: 'getProductPage',
        lastPage: 'getLastPageNumber'
      })
  },
  created() {
      this.setPage()
  },
  data: function () {
    return {
      columns: ['Image', 'Id', 'Title', 'Price', 'Stock', 'Active'],
      currentPage: 1,
      /*products: this.$store.state.products,*/
      products: JSON.parse(localStorage.getItem('products')),
    }
  },
  methods: {
    setPage() {
      const pageQuery = this.$route.query.page
      this.currentPage = parseInt(pageQuery <= this.lastPage || pageQuery < 1 ? pageQuery : 1) || 1
    }
  },
  watch: {
    $route() {
      this.setPage()
    }
  }
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
