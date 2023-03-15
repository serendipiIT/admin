<script>
  import { mapGetters } from 'vuex'
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'
  import axios from 'axios'

  export default {

    components: {
      QuillEditor,
    },
    data() {
      return {
        param: parseInt(this.$route.params.id),
        urlApi: 'http://SITsApi.us-east-1.elasticbeanstalk.com/',
      }
    },
    computed: {
      ...mapGetters({
        getJournal: 'getAllJournals',
      }),
      journal() {
        return {
          ...this.getJournal(this.param)
        }
      },
    },
    created() {
      console.log({...this.getJournal(this.param)})
      console.log(this.getJournal(this.param))
      console.log(typeof this.param)
    },
    watch: {
      $route() {
        this.param = parseInt(this.$route.params.id)
      },
    },
    methods: {
      async putJournal() {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `${this.journal.title}`,
            subtitle: `${this.journal.subtitle}`,
            content: `${this.journal.content}`,
            image: `${this.journal.image}`,
            tags: `${this.journal.tags}`,
          }),
        }
        const response = await fetch(`${this.urlApi}journal/${this.param}`, requestOptions)
        const data = await response.json()
        // this.$router.push('/JournalView')
        console.log(data)
      },

      async delJournal() {
        await axios.delete(`${this.urlApi}journal/${this.param}`).then((res) => console.log(res.data))
        this.$store.dispatch('getJournals').then((res) => (this.journals = res.data.data))
        this.$router.push('/JournalView')
        console.log('deleted')
      },
    },
  }
</script>
<template>
  <div>
  <div class="componentTitle flex justify-between">
    <h1>Edit Journal</h1>
    <p>ID no: {{ param }}</p>
  </div>

    <form id="content">
      <div id="center">
        <div id="productinfo" class="componentCard">
          <div>
            <h3 for="title">Title</h3>
            <div class="textFieldInput">
              <input type="textarea" id="title" style="width: 40vw" v-model="journal.title" />
            </div>
          </div>

          <div class="border-t pt-2 border-gray-200">
            <h3 for="description">Subtitle</h3>
            <QuillEditor style="height: 100%; min-height: 5rem" theme="snow" content-type="html" v-model:content="journal.subtitle" toolbar="full" />
          </div>

        <div class="border-t pt-2 border-gray-200">
            <h3 for="description">Content</h3>
            <QuillEditor style="height: 100%; min-height: 10rem" theme="snow" content-type="html" v-model:content="journal.content" toolbar="full" />
          </div>


        <div class="border-t pt-2 border-gray-200">
            <h3 for="title">Tags</h3>
            <div class="textFieldInput">
              <input type="textarea" id="title" style="width: 40vw" v-model="journal.tags" />
            </div>
          </div>

        <div id="media" class="componentCard">
          <label for="image">Image</label>
          <div>
            <img :src="journal.image" :alt="Image" width="200" />
            <div>
              <input type="file" id="imagewhopi" name="image" accept="image/png, image/jpeg" />
            </div>
          </div>
        </div>
      </div>
    </div>

    </form>

    <div class="flex justify-start">
      <div class="mx-4">
        <router-link :to="`/JournalView/`"><button class="button-68 greenW" role="button">Back</button></router-link>
      </div>

      <div class="justify-end">
        <button class="button-68 redW mr-3" role="button" @click="delJournal()">Delete</button>
        <button class="button-68 greenW" role="button" @click="putJournal()">Save</button>
      </div>

  </div>
</div>
</template>

<style></style>
