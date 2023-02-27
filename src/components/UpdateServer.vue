<template>
  <div>
    <button @click="getAxios()">Update Server</button>
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
    methods: {
      async getAxios() {
        await axios({
          method: 'get',
          url: `${this.urlApi}products`,
        })
          .then((response) => {
            this.products = response.data.data
            localStorage.setItem('products', JSON.stringify(response.data.data))
            console.log('requests ' + this.products[0].stock)
            console.log('uppdaterar vuúes store. [this.$store.state.products = ]', this.$store.state.products)
          })
          .catch((error) => {
            console.log(error)
          })
      },
    },
  }
</script>
<style lang="scss" scoped></style>
