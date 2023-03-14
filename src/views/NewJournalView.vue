<script>

  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'

  export default {

    components: {
      QuillEditor
    },
    data() {
      return {
        urlApi: 'http://SITsApi.us-east-1.elasticbeanstalk.com/',
        journal: {
          title: '',
          subtitle: '',
          content: '',
          tags: '',
          image: null,
        }
      }
    },
    created() {},
    methods: {
      async postJournal() {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `'${this.journal.title}'`,
            subtitle: `'${this.journal.subtitle}'`,
            content: `'${this.journal.content}'`,
            image: `'${this.journal.image}'`,
            tags: `'${this.journal.tags}'`,
          }),
        }
        const response = await fetch(`${this.urlApi}journal`, requestOptions)
        const data = await response.json()
        console.log(data)
      },
    },
  }
</script>

<template>
  <div>
<h1>New Journal</h1>
    <form id="content">
      <div id="center">
        <div id="journalinfo" class="componentCard">
          <div>
            <h3 for="title">Title</h3>
            <div class="textFieldInput">
              <input type="textarea" id="title" style="width: 40vw" v-model="journal.title" />
            </div>
          </div>
          <div>
            <h3 for="title">Subtitle</h3>
            <div class="textFieldInput">
              <input type="textarea" id="subtitle" style="width: 40vw" v-model="journal.subtitle" />
            </div>
          </div>

          <div class="border-t pt-2 border-gray-200">
            <h3 for="content">Content</h3>
            <QuillEditor style="height: 100%; min-height: 10rem" theme="snow" content-type="html" v-model:content="journal.content" />
            <!-- <div class="textFieldInput">
              <textarea id="content" name="content" v-model="journal.content" style="height: 100%; min-height: 10rem; width: 40vw" />
            </div> -->
          </div>
          <div>
            <h3 for="tags">#Tags</h3>
            <div class="textFieldInput">
              <input type="textarea" id="tags" style="width: 40vw" v-model="journal.tags" />
            </div>
          </div>
        </div>

        <div id="media" class="componentCard">
          <label for="image">Image</label>
          <div>
            <img :src="journal.image" alt="" width="200" />
            <div>
              <input type="file" id="image" name="image" accept="image/png, image/jpeg" />
            </div>
          </div>
        </div>

      </div>
    </form>
    <div class="flex justify-end">
      <div class="mx-4">
        <router-link :to="`/JournalView/`"><button class="button-68 greenW" role="button">Back</button></router-link>
      </div>
      <div>
        <button class="button-68 greenW" role="button" @click="postJournal()">Add New Journal</button>
      </div>
    </div>
  </div>
    </template>

<style lang="scss" scoped>
  #checkboxes {
    div {
      display: flex;
      flex-direction: row;
    }
  }

  #color {
    display: grid;
  }

  main {
    width: 90%;
    max-width: max-content;
    margin: auto;
    font-size: 1rem;
    #top {
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
      & > * {
        padding: 1rem;
      }
      h1 {
        flex-grow: 1;
      }
    }

    form {
      display: flex;
      #center {
        flex-grow: 3;
      }
      #side {
        flex-grow: 2;
        width: 16rem;
      }
      div {
        & > * {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      }
    }
  }
</style>
