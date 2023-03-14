<template>
  <transition
    enter-from-class="translate-x-[100%] opacity-0"
    leave-to-class="translate-x-[100%] opacity-0"
    enter-active-class="transition duration-300"
    leave-active-class="transition duration-300"
  >
    <form class="text-gray-800 absolute top-0 right-0 h-screen w-full sm:w-[30rem] bg-gray-100 z-50 py-16 px-8 sm:px-16">
      <v-icon name="io-close-outline" scale="1.4" @click.prevent="closeFilter" class="absolute cursor-pointer top-16 right-8 sm:right-16" />
      <h3 class="text-xl mb-4">Categories</h3>
      <button class="mr-4" :class="categoryClass(category)" @click.prevent="setFilterCategories(category)" :key="category" v-for="category in categories">
        {{ category }}
      </button>
      <h3 class="text-xl mb-4 mt-8">Status</h3>
      <button class="mr-4" :class="statusClass(status.status)" @click.prevent="setFilterStatus(status.status)" :key="status.name" v-for="status in statusList">
        {{ status.name }}
      </button>
      <div class="w-full flex flex-row">
        <button class="btn hover:border-black block w-[50%] my-16" @click.prevent="reset">Reset</button>
        <button class="btn bg-green-800 hover:border-black block w-[50%] my-16" @click.prevent="search">Search</button>
      </div>
    </form>
  </transition>
</template>

<script>
  import { OhVueIcon, addIcons } from 'oh-vue-icons'
  import { IoCloseOutline } from 'oh-vue-icons/icons'
  addIcons(IoCloseOutline)

  import { useFilterModal } from '../filterModal'
  export default {
    setup() {
      const filterModal = useFilterModal()

      return {
        closeFilter: filterModal.closeFilter,
        isFilterOpen: filterModal.isOpen,
      }
    },
    components: {
      vIcon: OhVueIcon,
    },
    created() {
      this.filterCategories = [...this.$store.state.filters.category]
      this.filterStatus = this.$store.state.filters.active
    },
    data() {
      return {
        filterCategories: [],
        searchTerm: null,
        filterStatus: null,
        categories: ['Man', 'Woman', 'Accessories'],
        statusList: [
          { name: 'Active', status: true },
          { name: 'Inactive', status: false },
        ],
      }
    },
    methods: {
      categoryClass(category) {
        return this.filterCategories.includes(category) ? 'font-semibold' : 'font-normal'
      },
      reset() {
        this.$store.commit('setFilters', { category: [], active: null })
        this.filterCategories = []
        this.filterStatus = null
        this.closeFilter()
      },
      search() {
        const test = JSON.parse(JSON.stringify({ category: this.filterCategories, active: this.filterStatus }))
        this.$store.commit('setFilters', test)
        this.closeFilter()
      },
      setFilterCategories(category) {
        if (this.filterCategories.includes(category)) {
          this.filterCategories = this.filterCategories.filter((cat) => cat !== category)
        } else {
          this.filterCategories.push(category)
        }
      },
      setFilterStatus(status) {
        if (this.filterStatus === status) {
          this.filterStatus = null
        } else {
          this.filterStatus = status
        }
      },
      statusClass(status) {
        return status === this.filterStatus ? 'font-semibold' : 'font-normal'
      },
    },
  }
</script>
