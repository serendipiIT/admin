<template>
  <div class="flex justify-between my-4">
    <h2>Order Confirmation Message</h2>
    <button @click="updateMsg">Uppdatera</button>
  </div>
  <QuillEditor style="height: 100%; min-height: 10rem" theme="snow" content-type="html" v-model:content="content" toolbar="full" />
</template>

<script>
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'

  export default {
    name: 'OrderConfirmationMsg',

    components: {
      QuillEditor,
    },

    data() {
      return {
        /*urlApi: 'http://SITsApi.us-east-1.elasticbeanstalk.com/',*/
        urlApi: 'http://localhost:3000/',
        content: null,
      }
    },

    created() {
      this.getOrderDetails()
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
        console.log(this.content)
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `${this.content}`,
          }),
        }
        const response = await fetch(`${this.urlApi}pages/10`, requestOptions)
        console.log(response)
      },
    },
  }
</script>

<style lang="scss" scoped></style>
