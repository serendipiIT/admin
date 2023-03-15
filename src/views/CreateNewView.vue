<template>
  <main>
    <OkMsg class="absolute inset-x-0 top-0" :class="{ hidden: isHidden }" @click="this.isHidden = !this.isHidden" />
    <div id="top" class="items-baseline">
      <div>
        <RouterLink to="/products" class="btn-arrow button-68">
          <v-icon name="bi-chevron-left" fill="gray" hover scale="1" />
        </RouterLink>
      </div>

      <h1 class="text-xl self-end" />

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
            <QuillEditor style="height: 100%; min-height: 10rem" theme="snow" content-type="html" v-model:content="product.description" toolbar="full" />
            <!--            <div class="textFieldInput">
              <textarea id="description" name="description" style="height: 100%; min-height: 10rem; width: 40vw" />
            </div>-->
          </div>
        </div>

        <div id="media" class="componentCard">
          <label for="image">Image</label>
          <div>
            <img :src="image" :alt="image" width="200" />
            <div>
              <input type="file" id="image" name="image" accept="image/png, image/jpeg" @change="newImage" />
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
              <input type="text" id="sizeguide" v-model="product.size_guide" />
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
              <select v-model="product.active" id="active">
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>

          <div id="price" class="border-t pt-2 border-gray-200">
            <label for="price">Price</label>
            <div class="textFieldInput" style="flex-direction: row">
              <input type="text" id="price" size="7" v-model="product.price" />
              <div>$</div>
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
            <div class="border-t pt-2 border-gray-200">
              <label for="color">Color</label>
              <div id="color" class="grid grid-cols-6">
                <div v-for="col in color" :key="col">
                  <div
                    @click="toggleColor(col)"
                    :class="checkedColors.includes(col) ? 'border-2 border-box border-gray-900' : 'border'"
                    class="rounded-full w-4 h-4 m-1"
                    :style="{ backgroundColor: col }"
                  />
                </div>
              </div>

              <div class="border-t pt-2 border-gray-200">
                <label for="size">Size</label>
                <div id="checkboxes">
                  <div v-for="size in sizes" :key="size">
                    <input v-model="checkedSizes" :id="size" type="checkbox" :value="size" />
                    <label :for="size">{{ size }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

    <div class="flex justify-end">
      <div>
        <button class="button-68 greenW" role="button" @click="postProduct()">Add New Product</button>
      </div>
    </div>
  </main>
</template>
<script>
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'
  import { OhVueIcon, addIcons } from 'oh-vue-icons'
  import { BiChevronLeft, BiChevronRight } from 'oh-vue-icons/icons'
  import { RouterLink } from 'vue-router'
  addIcons(BiChevronLeft, BiChevronRight)
  import OkMsg from '../components/OkMsg.vue'
  export default {
    name: 'CreateNew',

    components: {
      'v-icon': OhVueIcon,
      RouterLink,
      QuillEditor,
      OkMsg,
    },

    data() {
      return {
        isHidden: true,
        urlApi: 'http://SITsApi.us-east-1.elasticbeanstalk.com/',
        color: ['White', 'Gray', 'Black', 'Brown', 'Green', 'Red', 'Yellow', 'Blue'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', '32', '34', '36', '38', '40', '42', '44', 'One Size'],
        product: {
          category2: null,
          title: null,
          price: null,
          description: null,
          image: null,
          stock: null,
          active: null,
          material: null,
          size_guide: null,
          info: null,
          color: 'White',
          size: 'XL',
        },
        checkedSizes: [],
        checkedColors: [],
        image: null,
      }
    },
    computed: {
      categories() {
        return {
          ...this.$store.state.categories,
        }
      },
    },
    created() {
      this.$store.dispatch('getColumns')
    },
    methods: {
      async postProduct() {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `'${this.product.title}'`,
            price: parseInt(this.product.price),
            description: `'${this.product.description}'`,
            category2: `'${this.product.category2}'`,
            image: `'${this.image}'`,
            stock: parseInt(this.product.stock),
            active: parseInt(this.product.active),
            material: `'${this.product.material}'`,
            size_guide: `'${this.product.size_guide}'`,
            info: `'${this.product.info}'`,
            color: `'${this.checkedColors.length > 0 ? this.checkedColors.join(',') : 'White'}'`,
            size: `'${this.checkedSizes.length > 0 ? this.checkedSizes.join(',') : 'S'}'`,
          }),
        }
        const response = await fetch(`${this.urlApi}products`, requestOptions)
        const data = await response.json()
        console.log(data)
        if(response.status === 200) {
          this.isHidden = false
          setTimeout(() => { this.isHidden = !this.isHidden}, 50000);

        }
      },
      toggleColor(color) {
        this.checkedColors = this.checkedColors.includes(color) ? this.checkedColors.filter((c) => c !== color) : [...this.checkedColors, color]
      },

      newImage(e) {
        let files = e.target.files || e.dateTransfer.files
        this.image = '/assets/img/' + files[0].name
        console.log(this.image)
      },
    },
  }
</script>

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
