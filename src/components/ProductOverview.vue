<template>
  <Teleport to="#modal">
    <KeepAlive>
      <FilterModal v-if="isFilterOpen" />
    </KeepAlive>
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
              <v-icon v-if="column === activeSort && reverse === false" name="co-arrow-thick-bottom" scale=".8" />
            </template>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-500">
        <TransitionGroup class="h-2 table-row" name="product-list" tag="tr" v-for="product in productsOnCurrentPage" :key="product.id">
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
      <div class="[&>*]:mr-1 [&>*]:inline w-full text-right">
        <router-link v-if="showFirstPageLink" :to="firstPage">1</router-link>
        <p v-if="showFirstPageLink && currentPage + 1 < lastPageNumber">...</p>

        <router-link v-if="showPrevPageLink" :to="prevPage">{{ currentPage - 1 }}</router-link>

        <p class="font-semibold">{{ currentPage }}</p>

        <router-link v-if="showNextPageLink" :to="nextPage">{{ currentPage + 1 }}</router-link>

        <p v-if="showLastPageLink">
          ...
          <router-link :to="lastPage">{{ lastPageNumber }}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { OhVueIcon, addIcons } from 'oh-vue-icons'
  import { CoArrowThickBottom, CoArrowThickTop } from 'oh-vue-icons/icons'
  addIcons(CoArrowThickBottom, CoArrowThickTop)

  import { sortBy } from '../sortAndFilter'
  import { useFilterModal } from '../filterModal'
  import FilterModal from './FilterModal.vue'

  export default {
    setup() {
      const filterModal = useFilterModal()

      return {
        closeFilter: filterModal.closeFilter,
        isFilterOpen: filterModal.isOpen,
        openFilter: filterModal.openFilter,
        sortBy,
      }
    },
    name: 'ProductOverview',
    components: {
      'v-icon': OhVueIcon,
      FilterModal,
    },
    computed: {
      ...mapGetters({
        filteredProductList: 'filteredProductList',
      }),
      firstPage() {
        return `/products?page=${1}&items=${this.itemsPerPage}`
      },
      lastPage() {
        return `/products?page=${this.lastPageNumber}&items=${this.itemsPerPage}`
      },
      lastPageNumber() {
        return Math.ceil(this.filteredProductList.length / this.itemsPerPage)
      },
      nextPage() {
        return `/products?page=${this.currentPage + 1}&items=${this.itemsPerPage}`
      },
      prevPage() {
        return `/products?page=${this.currentPage - 1}&items=${this.itemsPerPage}`
      },
      productsOnCurrentPage() {
        const start = (this.currentPage - 1) * this.itemsPerPage
        const end = this.currentPage * this.itemsPerPage
        return this.filteredProductList.slice(start, end)
      },
      showFirstPageLink() {
        return this.currentPage > 1
      },
      showLastPageLink() {
        return this.currentPage < this.lastPageNumber
      },
      showNextPageLink() {
        return this.currentPage + 1 < this.lastPageNumber
      },
      showPrevPageLink() {
        return this.currentPage - 1 > 1
      },
    },
    created() {
      this.setPage()
    },
    data() {
      return {
        activeSort: null,
        columns: ['Image', 'Id', 'Title', 'Category', 'Price', 'Stock', 'Active'],
        // filteredProductList: [],
        itemsPerPage: 10,
        currentPage: 1,
        reverse: null,
      }
    },
    methods: {
      changeItemsPerPage(items) {
        const allProducts = this.filteredProductList.length

        this.$router.push({
          name: 'Products',
          query: {
            page: 1,
            items: items || allProducts,
          },
        })
      },
      setPage() {
        this.currentPage = parseInt(this.$route.query.page) || 1
        this.itemsPerPage = parseInt(this.$route.query.items) || 10
      },
      sort(key, reload = false) {
        let lowerCaseKey = `${key}`.toLowerCase()
        if (lowerCaseKey === 'category') {
          lowerCaseKey = 'category2'
        }

        if (reload) {
          this.$store.commit('sort', lowerCaseKey)
          if (this.reverse) this.$store.commit('reverse')
          return
        }

        if (this.activeSort !== key || this.reverse === null) {
          this.reverse = false
        } else if (this.reverse === true) {
          this.reverse = null
        } else if (this.reverse !== null) {
          this.reverse = !this.reverse
        } else {
          this.reverse = true
        }

        if (this.reverse === null) {
          this.$store.commit('sort', 'id')
        } else {
          this.$store.commit('sort', lowerCaseKey)
        }
        if (this.reverse) this.$store.commit('reverse')

        this.activeSort = key
      },
    },
    watch: {
      $route() {
        this.setPage()
      },
      filteredProductList() {
        this.sort(this.activeSort, true)
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
