<script>
import axios from 'axios';

  export default {
    data(){
      return {
        journal: this.$route.params.id
      }
    },
    mounted() {
      this.fetchJournal();
      console.log("Journals:", this.journal)
    },
    methods: {

      async fetchJournal() {
        const response = await axios.get (`http://SITsApi.us-east-1.elasticbeanstalk.com/journal/${this.$route.params.id}`);
        this.journals = response.data.data
      },
      async deleteJournal(journal) {
        await axios.delete(`http://SITsApi.us-east-1.elasticbeanstalk.com/journal/${journal.id}`)
        this.journals = this.journals.filter((j) => j.id !==journal.id)
      },
      // async editJournal(journal) {
      //   console.log('edit Journal:', journal);
      // },

      // async newJournal(journal) {
      //    console.log('new Journal:', journal);
      // }
    }
  }
</script>
<template>
  <h1>Edit Journal</h1>
  <p>ID no: {{ journal }}</p>
</template>

<style></style>
