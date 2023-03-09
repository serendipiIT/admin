<template>
  <div>
    <button @click="getProducts()">Update store</button>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        products: null,
        urlApi: 'http://SITsApi.us-east-1.elasticbeanstalk.com/',
      }
    },

    created() {},

    methods: {
      async getProducts() {
        // await axios({
        //   method: 'get',
        //   url: `${this.urlApi}products`,
        // })
        //   .then((response) => {
        //     this.products = response.data.data
        //     console.log('requests ' + this.products[0].stock)
        //     localStorage.setItem('products', JSON.stringify(response.data.data))
        //     console.log(`localStorage.getItem('products')`, JSON.parse(localStorage.getItem('products')))
        //     /*this.$store.commit('updateProducts')*/
        //     /*console.log('[this.$store.state.products = ]', this.$store.state.products)*/
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   })
      },
      async getJournal() {
        await axios({
          method: 'get',
          url: `${this.urlApi}journal`,
        })
          .then((response) => {
            console.log(response, response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      },
    },
  }
</script>
<style lang="scss" scoped></style>
