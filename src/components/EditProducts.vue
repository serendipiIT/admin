<script>
  import axios from "axios"

  export default {
    created() {
      this.getAxios()
    },
    data() {
      return {
        products: null,
        title: null,
        price: null,
        id: null,
        description: null,
        category: null,
        image: null,
        stock: null,
        urlApi: "http://SITsApi.us-east-1.elasticbeanstalk.com/",
      }
    },
    methods: {
      getAxios() {
        axios({
          method: "get",
          url: `${this.urlApi}products`,
        })
          .then((response) => {
            console.log("get api results", response.data.data)
            this.products = response.data.data
          })
          .catch((error) => {
            console.log(error)
          })
      },
      async postAxios() {
        await axios({
          method: "post",
          url: `${this.urlApi}products`,
          data: {
            title: `"${this.title}"`,
            price: this.price,
            description: `"${this.description}"`,
            category: `"${this.category}"`,
            image: `"${this.image}"`,
            stock: `"${this.stock}"`,
          },
        })
        console.log("post")
        this.getAxios()
      },
      async delAxios() {
        await axios({
          method: "delete",
          url: `${this.urlApi}products/${this.id}`,
        })
        console.log("delete")
        this.getAxios()
      },
    },
  }
</script>

<template>
  <h1>Products</h1>

  <h2>Add new product</h2>

  <input type="text" v-model="title" placeholder="title" />

  <input type="number" v-model="price" placeholder="price" />

  <input type="text" v-model="description" placeholder="description" />

  <select v-model="category">
    <option value="electronics">electronics</option>
    <option value="jewelery">jewelery</option>
    <option value="men's clothing">men's clothing</option>
    <option value="women's clothing">women's clothing</option>
  </select>

  <input type="number" v-model="stock" placeholder="stock" />

  <input type="text" v-model="image" placeholder="image url" />
  <button @click="postAxios">Add product</button>

  <h2>Remove product</h2>

  <input type="number" v-model="id" placeholder="id" />
  <input type="submit" @click="delAxios" value="Remove product" />

  <h2>All products</h2>

  <table style="text-align: center">
    <th>id</th>
    <th>title</th>
    <th>price</th>
    <th>description</th>
    <th>category</th>
    <th>stock</th>
    <th>created at</th>
    <th>image</th>

    <tr v-for="product in products" :key="product.id">
      <td style="width: 5%">{{ product.id }}</td>
      <td style="width: 25%">{{ product.title }}</td>
      <td style="width: 5%">{{ product.price }}</td>
      <td style="width: 25%">{{ product.description }}</td>
      <td style="width: 15%">{{ product.category }}</td>
      <td style="width: 15%">{{ product.stock }}</td>
      <td style="width: 15%">{{ product.created_at }}</td>
      <td style="width: 15%">
        <img :src="product.image" style="max-width: 200px" />
      </td>
    </tr>
  </table>
</template>
