<script>
  export default {
    computed: {
      journals() {
        return this.$store.state.journalList
      },
    },
  }
</script>

<template>
  <div>
    <div class="componentTitle flex justify-between">
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
            <td>{{ journal.subtitle.slice(0, 10) }}...</td>
            <td>{{ journal.content.slice(0,30) }}...</td>
            <!-- v-html="journal.content" -->
            <td>{{ journal.tags.slice(0,20) }}...</td>
            <td><img class="w-24" :src="journal.image" alt="Journal picture" /></td>
            <td>{{ new Date(journal.created_at).toLocaleString('sv-SE', { timeZone: 'GMT' }) }}</td>
            <td class="flex items-center justify-end gap-10"><button class="cursor-pointer border border-black py-2 px-6 rounded-3xl hover:bg-gray-800 hover:text-white transition-all" @click="$router.push({ name: 'EditJournal', params: { id: journal.id } })">Edit</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
