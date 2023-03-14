<script>
  export default {
    data() {
      return {
        journal: null,
        title: '',
        subtitle: '',
        id: null,
        content: '',
        tags: '',
        image: '',
        urlApi: 'http://SITsApi.us-east-1.elasticbeanstalk.com/',
      }
    },
  }
</script>

<template>
  <h1>Journals</h1>

  <h2>Edit Current Journal</h2>

  <input type="text" v-model="title" placeholder="title" />

  <input type="textfield" v-model="subtitle" placeholder="subtitle" />

  <input type="textfield" v-model="content" placeholder="content" />

  <input type="text" v-model="tags" placeholder="tag" />

  <input type="text" v-model="image" placeholder="image url" />
  <button @click="postAxios">Add journal</button>

  <h2>Remove product</h2>

  <input type="number" v-model="id" placeholder="id" />
  <input type="submit" @click="delAxios" value="Remove product" />
</template>
