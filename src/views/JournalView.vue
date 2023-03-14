<script>
import axios from 'axios';

  export default {
    data(){
      return{
        journals: [],
      }
    },
    mounted() {
      this.fetchJournals();
      console.log("Journals:", this.journals)
    },
    methods: {

      async fetchJournals() {
        const response = await axios.get ("http://SITsApi.us-east-1.elasticbeanstalk.com/journal");
        this.journals = response.data.data
      },
      async deleteJournal(journal) {
        await axios.delete(`http://SITsApi.us-east-1.elasticbeanstalk.com/journal/${journal.id}`)
        this.journals = this.journals.filter((j) => j.id !==journal.id)
      },
      async editJournal(journal) {
        console.log('edit Journal:', journal);
      },

      async newJournal(journal) {
         //routerlink till skapa ny journalsida???
         console.log('new Journal:', journal);
      }
    }
  }
</script>


<template>
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
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-500">
        <tr v-for="journal in journals" :key="journal.id">
        <td><router-link v-shortText="{ text: journal.title, chars: 40 }" :to="`/EditJournalsView/${journal.id}`" /></td>
        <td>{{ journal.subtitle }}</td>
        <td v-shortText="{ text: journal.content, chars: 200 }">{{ journal.content }}</td>
        <!-- v-html="journal.content" -->
        <td>{{ journal.tags }}</td>
        <td><img :src="journal.image" alt="Journal picture" /><a :href="journal.image">{{ journal.image }}</a></td>
        <td>{{ journal.created_at }}</td>
        <td><button @click="editJournal(journal)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Change</button></td>
        <td><button @click="deleteJournal(journal)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

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
