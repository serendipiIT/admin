<template>
  <section class="absolute top-0 right-0 h-screen w-full sm:w-[30rem]">
    <h2>Filters</h2>
    <form>
      <label for="search">Search product</label>
      <input id="search" placeholder="Blue shirt" type="text" v-model="searchTerm" />
      <fieldset>
        <legend>Categories</legend>
        <input id="man" name="man" type="checkbox" value="man" v-model="categories" />
        <label for="man">Man</label>
        <input id="woman" name="woman" type="checkbox" value="woman" v-model="categories" />
        <label for="woman">Woman</label>
        <input id="accessories" name="accessories" type="checkbox" value="accessories" v-model="categories" />
        <label for="accessories">Accessories</label>
      </fieldset>
      <fieldset>
        <legend>Status</legend>
        <label for="active">Active</label>
        <input id="active" name="status" type="radio" value="active" v-model="status" />
        <label for="inactive">Inactive</label>
        <input id="inactive" name="status" type="radio" value="inactive" v-model="status" />
      </fieldset>
      <button @click.prevent="search">Search</button>
    </form>
  </section>
</template>

<script>
  import { useFilterModal } from '../filterModal'
  export default {
    setup() {
      const filterModal = useFilterModal()

      return {
        closeFilter: filterModal.closeFilter,
        isFilterOpen: filterModal.isOpen,
      }
    },
    data() {
      return {
        categories: [],
        status: null,
      }
    },
    methods: {
      search() {
        this.$store.commit('setFilters', { category: this.categories, status: this.status })
      },
    },
  }
</script>

<style lang="scss" scoped></style>
