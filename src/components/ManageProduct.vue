<template>
  <main>
    <OkMsg class="sticky z-10 inset-x-0 top-0" :class="{ hidden: isHidden }" @click="this.isHidden = !this.isHidden" />
    <div id="top" class="items-baseline">
      <div>
        <RouterLink to="/products" class="btn-arrow button-68">
          <v-icon name="bi-chevron-left" fill="gray" hover scale="1" />
        </RouterLink>
      </div>

      <h1 class="text-xl self-end">{{ product.title }}</h1>

      <p class="self-end">id: {{ product.id }}</p>

      <div>
        <RouterLink :to="`/products/${prevId}`" class="btn-arrow button-68">
          <v-icon name="bi-chevron-left" fill="gray" hover scale="1" />
        </RouterLink>
        <RouterLink :to="`/products/${nextId}`" class="btn-arrow button-68">
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
            <QuillEditor style="height: 100%; min-height: 10rem" theme="snow" content-type="html" v-model:content="product.description" toolbar="full" />
            <!--            <div class="textFieldInput">
              <textarea id="description" name="description" style="height: 100%; min-height: 10rem; width: 40vw" />
            </div>-->
          </div>
        </div>

        <div id="media" class="componentCard">
          <label for="image">Image</label>
          <div>
            <img :src="hejsan" :alt="hejsan" width="200" />
            <div>
              <input type="file" id="imagewhopi" name="image" accept="image/png, image/jpeg" />
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
                <select v-model="product.category2">
                  <option :value="null" selected disabled hidden>{{ null }}</option>
                  <option v-for="category in categories" :key="category.id" :value="category">{{ category }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="flex justify-between">
      <div>
        <button class="button-68 redW mr-3" role="button" @click="delProduct()">Delete Product</button>
        <button class="button-68 greenW" role="button" @click="putProduct()">Save</button>
      </div>
    </div>
  </main>
</template>

<script>
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'
  import axios from 'axios'
  import { OhVueIcon, addIcons } from 'oh-vue-icons'
  import { BiChevronLeft, BiChevronRight } from 'oh-vue-icons/icons'
  import { RouterLink } from 'vue-router'
  addIcons(BiChevronLeft, BiChevronRight)
  import OkMsg from './OkMsg.vue'

  export default {
    name: 'ManageProduct',

    components: {
      'v-icon': OhVueIcon,
      RouterLink,
      QuillEditor,
      OkMsg,

    },

    computed: {
      product() {
        return {
          ...this.$store.state.productList.find((element) => element.id === this.id),
        }
      },

      categories() {
        return {
          ...this.$store.state.categories,
        }
      },

      hejsan() {
        if (document.querySelector('#imagewhopi') === null) {
          return this.product.image
        } else {
          return document.querySelector('#imagewhopi')
        }
      },
      /*newImg: productList. document.querySelector('#image').files[0].name,*/
    },

    data() {
      return {
        id: parseInt(this.$route.params.id),
        nextId: null,
        prevId: null,
        urlApi: 'http://SITsApi.us-east-1.elasticbeanstalk.com/',
        /*urlApi: 'http://localhost:3000/',*/
        isHidden: true,

      }
    },
    created() {
      this.product = this.$store.state.filteredProductList.find((element) => element.id === this.id)
      const index = this.$store.state.filteredProductList.map((product) => product.id).indexOf(this.id)
      const nextIndex = index < this.$store.state.filteredProductList.length - 1 ? index + 1 : 0
      const prevIndex = index > 1 ? index - 1 : this.$store.state.filteredProductList.length - 1

      this.nextId = this.$store.state.filteredProductList[nextIndex]?.id || this.id
      this.prevId = this.$store.state.filteredProductList[prevIndex]?.id || this.id
      console.log(this.prevId)
      console.log(this.nextId)
    },
    methods: {
      async putProduct() {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `${this.product.title}`,
            price: parseInt(this.product.price),
            description: `${this.product.description}`,
            category2: `${this.product.category2}`,
            image: `${this.product.image}`,
            stock: parseInt(this.product.stock),
            active: `${this.product.active}`,
            material: `${this.product.material}`, 
            size_guide: `${this.product.size_guide}`, 
            info: `${this.product.info}`, 
            color: `${this.product.color}`, 
            size: `${this.product.size}`
          }),
        }
        const response = await fetch(`${this.urlApi}products/${this.product.id}`, requestOptions)
        if(response.status === 200) {
          this.isHidden = false
          setTimeout(() => { this.isHidden = !this.isHidden}, 50000);
        }
        console.log(response.status)
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
