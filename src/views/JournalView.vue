<script>
import axios from 'axios';

  export default {


    computed: {
      journals() {
        return this.$store.state.journalList
      }

    },
    methods: {

      // async fetchJournals() {
      //   const response = await axios.get ("http://SITsApi.us-east-1.elasticbeanstalk.com/journal");
      //   this.journals = response.data.data
      // },
      // async deleteJournal(journal) {
      //   await axios.delete(`http://SITsApi.us-east-1.elasticbeanstalk.com/journal/${journal.id}`)
      // this.$store.dispatch('getOrders').then((res) => (this.orders = res.data.data))
      //   this.journals = this.journals.filter((j) => j.id !==journal.id)
      // },
      // async editJournal(journal) {
      //   console.log('edit Journal:', journal);
      // },

      // async newJournal(journal) {
      //    //routerlink till skapa ny journalsida???
      //    console.log('new Journal:', journal);
      // }
    }
  }
</script>


<template>
  <div>
  <div class="flex justify-between items-center">
    <h1>Journal</h1>
    <router-link :to="`/NewJournalView/`"><button class="button-68 greenW">New Journal</button></router-link>
  </div>
  <div class="componentCard">
    <table class="table table-auto w-full">
      <thead>
        <tr class="table-row">
        <th>Title</th>
        <th>Subtitle</th>
        <th>Content</th>
        <th>Tags</th>
        <th>Image</th>
        <th>Created</th>
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-500">
        <tr v-for="journal in journals" :key="journal.id">
        <td v-shortText="{ text: journal.title, chars: 10 }">{{ journal.title }}</td>
        <td>{{ journal.subtitle.slice(0, 10) }}</td>
        <td v-shortText="{ text: journal.content, chars: 30 }">{{ journal.content }}</td>
        <!-- v-html="journal.content" -->
        <td>{{ journal.tags }}</td>
        <td><img class="w-24" :src="journal.image" alt="Journal picture" /></td>
        <td>{{ new Date(journal.created_at).toLocaleString('sv-SE', {timeZone: 'GMT' }) }}</td>
        <button @click="$router.push({name: 'EditJournal', params: {id: journal.id}})">Edit</button>


        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<style lang="scss" scoped>
</style>
