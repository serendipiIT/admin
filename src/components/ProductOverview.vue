<template>
  <Teleport to="#modal">
    <FilterModal v-if="isFilterOpen" />
  </Teleport>
  <div class="componentTitle flex justify-between items-center">
    <h1>Products</h1>
    <div class="flex-1 text-center">
      <p class="mr-2 inline">Items per page:</p>
      <button class="mr-2" @click="changeItemsPerPage(10)">10</button>
      <button class="mr-2" @click="changeItemsPerPage(20)">20</button>
      <button class="mr-2" @click="changeItemsPerPage(50)">50</button>
      <button class="mr-2" @click="changeItemsPerPage()">All</button>
    </div>
    <button @click="openFilter" class="button-68 blueW mr-8">All Filters</button>
    <router-link to="/create"><button class="button-68 greenW" role="button">Add Product</button></router-link>
  </div>
  <div class="componentCard">
    <table class="table table-auto w-full">
      <thead>
        <tr class="table-row">
          <th v-for="column in columns" :key="column" @click="sort(column)" :class="column !== 'Image' && 'cursor-pointer'">
            {{ column.toUpperCase() }}
            <template v-if="column != 'Image'">
              <v-icon v-if="column === activeSort && reverse" name="co-arrow-thick-top" scale=".8" />
              <v-icon v-if="column === activeSort && !reverse" name="co-arrow-thick-bottom" scale=".8" />
            </template>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-500">
        <TransitionGroup class="h-2 table-row" name="product-list" tag="tr" v-for="product in productPage(currentPage)(itemsPerPage)" :key="product.title">
          <td :key="product.id + '1'">
            <img :src="product.image" style="max-width: 50px" />
          </td>
          <td :key="product.id + '2'" class="p-2">{{ product.id }}</td>
          <td :key="product.id + '3'">
            <router-link v-shortText="{ text: product.title, chars: 40 }" :to="`/products/${product.id}`" />
          </td>
          <td :key="product.id + '4'">{{ product.category2 }}</td>
          <td :key="product.id + '5'">{{ product.price }}</td>
          <td :key="product.id + '6'">{{ product.stock }}</td>
          <td :key="product.id + '7'"><span :class="`block  m-auto rounded-full p-2 w-2 h-2 ${product.active ? 'bg-green-800' : 'bg-red-700'}`" /></td>
        </TransitionGroup>
      </tbody>
    </table>
    <div class="mt-4 flex flex-row justify-between px-10">
      <!-- <button :disabled="currentPage > 1 ? false : true" @click="$router.push(prevPage)">Previous</button> -->
      <div class="[&>*]:mr-1 [&>*]:inline w-full text-right">
        <router-link v-if="!(currentPage - 1 === 1) && currentPage !== 1" :to="firstPage">1</router-link>
        <router-link v-if="currentPage - 1 >= 1" :to="prevPage">{{ currentPage - 1 }}</router-link>
        <p class="font-semibold">{{ currentPage }}</p>
        <router-link v-if="currentPage + 1 < lastPageNumber(itemsPerPage)" :to="nextPage">{{ currentPage + 1 }}</router-link>
        <p v-if="currentPage !== lastPageNumber(itemsPerPage)">
          ...
          <router-link :to="lastPage">{{ lastPageNumber(itemsPerPage) }}</router-link>
        </p>
      </div>
      <!-- <button :disabled="currentPage < lastPageNumber(itemsPerPage) ? false : true" @click="$router.push(nextPage)">Next</button> -->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { OhVueIcon, addIcons } from 'oh-vue-icons'
  import { CoArrowThickBottom, CoArrowThickTop } from 'oh-vue-icons/icons'
  addIcons(CoArrowThickBottom, CoArrowThickTop)

  import { useFilterModal } from '../filterModal'
  import FilterModal from './FilterModal.vue'

  export default {
    setup() {
      const filterModal = useFilterModal()

      return {
        closeFilter: filterModal.closeFilter,
        isFilterOpen: filterModal.isOpen,
        openFilter: filterModal.openFilter,
      }
    },
    name: 'ProductOverview',
    components: {
      'v-icon': OhVueIcon,
      FilterModal,
    },
    computed: {
      ...mapGetters({
        productPage: 'getProductPage',
        lastPageNumber: 'getLastPageNumber',
        filteredProducts: 'getFilteredProductList',
      }),
      firstPage() {
        return `/products?page=${1}&items=${this.itemsPerPage}`
      },
      lastPage() {
        return `/products?page=${this.lastPageNumber(this.itemsPerPage)}&items=${this.itemsPerPage}`
      },
      nextPage() {
        return `/products?page=${this.currentPage + 1}&items=${this.itemsPerPage}`
      },
      products() {
        return this.$store.state.productList
      },
      prevPage() {
        return `/products?page=${this.currentPage - 1}&items=${this.itemsPerPage}`
      },
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
        reverse: false,
        /*products: this.$store.state.products,*/
        // products: JSON.parse(localStorage.getItem('products')),
      }
    },
    methods: {
      sort(sortBy) {
        this.reverse = !this.reverse
        if (sortBy !== this.activeSort) this.reverse = false
        this.$store.commit(`sortBy${sortBy}`, this.reverse)
        this.activeSort = sortBy
      },
      changeItemsPerPage(items = 'default') {
        const itemsInView = this.currentPage * this.itemsPerPage
        if (items === 'default') {
          this.$router.push({
            name: 'Products',
            query: {
              page: 1,
              items: this.products.length,
            },
          })
          return
        }
        const calculatedNewPage = Math.ceil(itemsInView / items)
        this.$router.push({
          name: 'Products',
          query: {
            page: calculatedNewPage,
            items,
          },
        })
      },
      setPage() {
        // Kanske att jag tänkt en gång för mycket. Det här kommer garanterat inte fungera om man går från att visa alla till att visa 10 per sida. Då vill man antagligen inte längre hamna på sista sidan.
        const pageQuery = this.$route.query.page
        const itemsPerPageQuery = this.$route.query.items
        this.itemsPerPage = parseInt(itemsPerPageQuery) > this.products.length ? this.products.length : parseInt(itemsPerPageQuery) || 10
        this.currentPage = parseInt(pageQuery <= this.lastPageNumber(this.itemsPerPage) || pageQuery < 1 ? pageQuery : 1) || 1
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
    text-align: center;
  }

  th:nth-of-type(3),
  tbody td:nth-of-type(3) {
    text-align: start;
    padding-left: 16px;
    width: 50%;
  }

  img {
    height: 3rem;
    margin: auto;
  }

  .product-list-move {
    transition: transform 0.5s;
  }
</style>
