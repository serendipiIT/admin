<template>
  <OkMsg
    class="absolute inset-x-0 top-0"
    :class="{ hidden: isHidden }"
    @click="this.isHidden = !this.isHidden"
  />
  <div class="flex justify-between my-4">
    <h2>Order Confirmation Message</h2>
    <button @click="updateMsg">Uppdatera</button>
  </div>
  <QuillEditor
    style="height: 100%; min-height: 10rem"
    theme="snow"
    content-type="html"
    v-model:content="content"
    toolbar="full"
  />
</template>

<script>
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'
  import OkMsg from './OkMsg.vue'

  export default {
    name: 'OrderConfirmationMsg',

    components: {
      QuillEditor,
      OkMsg,
    },

    data() {
      return {
        urlApi: 'http://SITsApi.us-east-1.elasticbeanstalk.com/',
        /*urlApi: 'http://localhost:3000/',*/
        content: null,
        email: 'email@email.com',
        isHidden: true,
      }
    },

    created() {
      this.getOrderDetails()
    },

    computed: {
      newContent() {
        if (this.content) {
          return this.content.replace(/"/g, '\"') //eslint-disable-line
        } else {
          return null
        }
      },
    },

    methods: {
      async getOrderDetails() {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
        const response = await fetch(`${this.urlApi}pages`, requestOptions)
        const data = await response.json()
        this.content = data.data.find((element) => element.id === 10).content
      },
      async updateMsg() {
        console.log(this.newContent)
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `${this.newContent}`,
          }),
        }
        const response = await fetch(`${this.urlApi}pages/10`, requestOptions)
        console.log(response.status)
        if (response.status === 200) {
          this.isHidden = false
          setTimeout(() => {
            this.isHidden = !this.isHidden
          }, 50000)
        }
      },
    },
  }
</script>

<style lang="scss" scoped></style>
