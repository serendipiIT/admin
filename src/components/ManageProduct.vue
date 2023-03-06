<template>
  <main>
    <div id="top" class="items-baseline">
      <div>
        <RouterLink to="/products" class="btn-arrow button-68">
          <v-icon name="bi-chevron-left" fill="gray" hover scale="1" />
        </RouterLink>
      </div>

      <h1 class="text-xl self-end">{{ product.title }}</h1>

      <p class="self-end">id: {{ product.id }}</p>

      <div>
        <RouterLink to="/products/2" class="btn-arrow button-68">
          <v-icon name="bi-chevron-left" fill="gray" hover scale="1" />
        </RouterLink>
        <RouterLink to="/products/3" class="btn-arrow button-68">
          <v-icon name="bi-chevron-right" fill="gray" hover scale="1" />
        </RouterLink>
      </div>
    </div>
    <form id="content">
      <div id="center">
        <div id="productinfo" class="componentCard">
          <div>
            <h3 for="title">Title</h3>
            <div class="textFieldInput">
              <input type="textarea" id="title" style="width: 40vw" v-model="product.title" />
            </div>
          </div>
          <div class="border-t pt-2 border-gray-200">
            <h3 for="description">Description</h3>
            <div class="textFieldInput">
              <textarea id="description" name="description" v-model="product.description" style="height: 100%; min-height: 10rem; width: 40vw" />
            </div>
          </div>
        </div>

        <div id="media" class="componentCard">
          <label for="image">Image</label>
          <div>
            <img :src="newImg" alt="" width="200" />
            <div>
              <input type="file" id="image" name="image" accept="image/png, image/jpeg" />
            </div>
          </div>
        </div>

        <div id="extrainfo" class="componentCard">
          <div>
            <label for="material">Material</label>
            <div class="textFieldInput">
              <input type="text" id="material" v-model="product.material" />
            </div>
          </div>

          <div>
            <label for="sizeguide">Size Guide</label>
            <div class="textFieldInput">
              <input type="text" id="sizeguide" v-model="product.sizeguide" />
            </div>
          </div>

          <div>
            <label for="info">Info</label>
            <div class="textFieldInput">
              <input type="text" id="info" v-model="product.info" />
            </div>
          </div>
        </div>
      </div>

      <div id="side">
        <div class="componentCard">
          <div id="status">
            <label for="active">Product status</label>
            <div class="textFieldInput">
              <select v-model="active" id="active">
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>

          <div id="price" class="border-t pt-2 border-gray-200">
            <label for="price">Price</label>
            <div class="textFieldInput" style="flex-direction: row">
              <input type="text" id="price" size="7" v-model="product.price" />
              <div>kr</div>
            </div>
          </div>

          <div id="organization" class="border-t pt-2 border-gray-200">
            <label for="stock">Stock</label>
            <div class="textFieldInput" style="flex-direction: row">
              <input type="text" id="stock" size="7" v-model="product.stock" />
              <div>st</div>
            </div>

            <div class="border-t pt-2 border-gray-200">
              <label for="category">Category</label>
              <div class="textFieldInput">
                <select v-model="product.category">
                  <option value="electronics">electronics</option>
                  <option value="jewelery">jewelery</option>
                  <option value="men's clothing">men's clothing</option>
                  <option value="women's clothing">women's clothing</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

    <div class="flex justify-between">
      <UpdateServer class="button-68" />
      <div>
        <button class="button-68 redW mr-3" role="button" @click="delProduct()">Delete Product</button>
        <button class="button-68 greenW" role="button" @click="putProduct()">Save Product</button>
      </div>
    </div>
  </main>
</template>

<script>
  import axios from 'axios'
  import UpdateServer from './UpdateServer.vue'
  import { OhVueIcon, addIcons } from 'oh-vue-icons'
  import { BiChevronLeft, BiChevronRight } from 'oh-vue-icons/icons'
  import { RouterLink } from 'vue-router'
  addIcons(BiChevronLeft, BiChevronRight)

  export default {
    name: 'ManageProduct',

    components: {
      UpdateServer,
      'v-icon': OhVueIcon,
      RouterLink,
    },

    data() {
      return {
        id: parseInt(this.$route.params.id),
        productList: JSON.parse(localStorage.getItem('products')),
        /* productList: this.$store.state.products,*/
        product: null,
        nextId: 1,
        prevId: null,
        active: false,
        urlApi: 'http://SITsApi.us-east-1.elasticbeanstalk.com/',
        /*newImg: document.querySelector('#image').files[0].name,*/
      }
    },
    created() {
      this.product = this.productList.find((element) => element.id === this.id)
      this.nextId = this.product + 1
      this.prevId = this.product - 1
      console.log(this.product.active)
      if (this.product.active === 1) {
        this.active = true
      }
    },
    methods: {
      buttonfjopp() {
        console.log(this.product.id)

        console.log(this.product.title)
        console.log(this.product.price)
        console.log(this.product.description)
        console.log(this.product.category)
        console.log(this.product.image)
        console.log(this.product.stock)
        console.log(this.product.active)
      },

      async putProduct() {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `${this.product.title}`,
            price: parseInt(this.product.price),
            description: `${this.product.description}`,
            category: `${this.product.category}`,
            image: `${this.product.image}`,
            stock: parseInt(this.product.stock),
            active: parseInt(this.product.active),
          }),
        }
        const response = await fetch(`${this.urlApi}products/${this.product.id}`, requestOptions)
        const data = await response.json()
        console.log(data)
      },

      async delProduct() {
        await axios({
          method: 'delete',
          url: `${this.urlApi}products/${this.id}`,
        })
        console.log('delete')
      },
    },
  }

  /*let changeImg = this.image
      if (this.image === null) {
        changeImg = '/assets/product-img/example.jpg'
      }

      await axios({
        method: 'put',
        url: `${this.urlApi}products/${this.product.id}`,
        data: {
          title: `"${this.product.title}"`,
          price: this.product.price,
          description: `"${this.product.description}"`,
          category: `"${this.product.category}"`,
          image: `"${changeImg}"`,
          stock: `"${this.product.stock}"`,
        },*/
</script>

<style lang="scss" scoped>
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
