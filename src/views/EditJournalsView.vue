<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        param: parseInt(this.$route.params.id),
      }
    },
    computed: {
      ...mapGetters({
        getJournal: 'getAllJournals',
      }),
      journal() {
        return this.getJournal(this.param)
      },
    },
    created() {
      console.log(this.journal.title)
      console.log(typeof this.param)
    },
    watch: {
      $route() {
        this.param = parseInt(this.$route.params.id)
      },
    },
  }
</script>
<template>
  <div>
    <h1>Edit Journal</h1>
    <p>ID no: {{ param }}</p>
  </div>
</template>

<style></style>
