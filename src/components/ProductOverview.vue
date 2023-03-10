<template>
  <div class="componentTitle flex justify-between">
    <h1>Products</h1>
    <router-link :to="`/create`"><button class="button-68 greenW" role="button">Add Product</button></router-link>
  </div>
  <div class="componentCard">
    <table class="table table-auto w-full">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column" @click="sort(column)">
          <td>
            {{ column.toUpperCase() }}
          </td>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-500">
        <TransitionGroup class="h-2" name="product-list" tag="tr" v-for="product in productPage(currentPage)(itemsPerPage)" :key="product.title">

          <!-- <tr class="h-2" v-for="product in productPage(currentPage)" :key="product"> -->
          <td :key="product.id">
              <img :src="product.image" style="max-width: 50px" />
          </td>
          <td :key="product.id" class="p-2">{{ product.id }}</td>
          <td :key="product.id">
            <router-link :to="`/products/${product.id}`">{{ product.title.substring(0, 40) + '...' }}</router-link>
          </td>
          <td :key="product.id">{{ product.category2 }}</td>
          <td :key="product.id">{{ product.price }}</td>
          <td :key="product.id">{{ product.stock }}</td>
          <td :key="product.id">{{ product.active === 1 ? 'Active' : 'Inactive' }}</td>
          <!-- </tr> -->
        </TransitionGroup>
      </tbody>
    </table>
    <div class="mt-4 flex flex-row justify-between px-10">
      <button :disabled="currentPage > 1 ? false : true" @click="$router.push(prevPage)">Previous</button>
      <div>
        <p class="mr-2 inline">Per page:</p>
        <button class="mr-2" @click="changeItemsPerPage(10)">10</button>
        <button class="mr-2" @click="changeItemsPerPage(20)">20</button>
        <button class="mr-2" @click="changeItemsPerPage(50)">50</button>
        <button class="mr-2" @click="changeItemsPerPage()">All</button>
      </div>
      <button :disabled="currentPage < lastPage(itemsPerPage) ? false : true" @click="$router.push(nextPage)">Next</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ProductOverview',
    computed: {
      ...mapGetters({
        productPage: 'getProductPage',
        lastPage: 'getLastPageNumber',
      }),
      prevPage() {
        return `/products?page=${this.currentPage - 1}&items=${this.itemsPerPage}`
      },
      nextPage() {
        return `/products?page=${this.currentPage + 1}&items=${this.itemsPerPage}`
      }
    },
    created() {
      this.setPage()
    },
    data: function () {
      return {
        activeSort: null,
        columns: ['Image', 'Id', 'Title', 'Category', 'Price', 'Stock', 'Active'],
        currentPage: 1,
        itemsPerPage: 10,
        /*products: this.$store.state.products,*/
        // products: JSON.parse(localStorage.getItem('products')),
      }
    },
  methods: {
    sort(sortBy) {
      if (sortBy === this.activeSort) {
        this.$store.commit(`sortBy${sortBy}`, true)
        this.activeSort = null
        return
      } else {
        this.$store.commit(`sortBy${sortBy}`)
      }
      this.activeSort = sortBy
    },
    changeItemsPerPage(items=Infinity) {
      const itemsInView = this.currentPage * this.itemsPerPage
      if (items === Infinity) {
        this.$router.push({
          name: 'Products',
          query: {
            page: 1,
            items: 99999
          }
        })
        return
      }
      const calculatedNewPage = itemsInView / items
      this.$router.push({
        name: 'Products',
        query: {
          page: calculatedNewPage,
          items,
        }
      })
    },
      setPage() {
        const pageQuery = this.$route.query.page
        const itemsPerPageQuery = this.$route.query.items
        this.itemsPerPage = parseInt(itemsPerPageQuery) || 10
        this.currentPage = parseInt(pageQuery <= this.lastPage(this.itemsPerPage) || pageQuery < 1 ? pageQuery : 1) || 1
      },
    },
    watch: {
      $route() {
        this.setPage()
      },
    },
  }
</script>

<style lang="scss" scoped>
  tr:nth-child(even) {
    background-color: #dfdfdf;
  }

  th,
  td {
    padding: 0.5rem 0;
  }

  img {
    height: 3rem;
    margin: auto;
  }

  .product-list-move {
    transition: transform .5s;
  }
</style>
