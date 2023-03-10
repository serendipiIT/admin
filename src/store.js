import VuexPersistence from 'vuex-persist'
import { createStore } from 'vuex'

import { byActive, byCategory, byId, byPrice, byStock, byTitle } from './sortAndFilter'

const actions = {
  async getProducts({ commit }) {
    const products = (await (await fetch('http://SITsApi.us-east-1.elasticbeanstalk.com/products')).json()).data
    const productsFixedKeys = products
      .filter((product) => product.color && product.size)
      .map((product) => {
        return {
          ...product,
          color: product.color.split(','),
          id: Number(product.id),
          price: Number(product.price),
          size: product.size.split(','),
          stock: Number(product.stock),
        }
      })
    commit('setProductList', productsFixedKeys)
  },
}

const getters = {
  getProductPage: (state) => (page) => {
    const start = (page - 1) * 10
    const end = page * 10
    return state.productList.slice(start, end)
  },
  getLastPageNumber(state) {
    return Math.ceil(state.productList.length / 10)
  },
}

const mutations = {
  setProductList(state, products) {
    state.productList = products
  },
  sortByActive(state, reverse = false) {
    state.productList.sort(byActive)
    if (reverse) state.productList.reverse()
  },
  sortByCategory(state, reverse = false) {
    state.productList.sort(byCategory)
    if (reverse) state.productList.reverse()
  },
  sortById(state, reverse = false) {
    state.productList.sort(byId)
    if (reverse) state.productList.reverse()
  },
  sortByPrice(state, reverse = false) {
    state.productList.sort(byPrice)
    if (reverse) state.productList = state.productList.reverse()
  },
  sortByStock(state, reverse = false) {
    state.productList = state.productList.sort(byStock)
    if (reverse) state.productList.reverse()
  },
  sortByTitle(state, reverse = false) {
    state.productList = [...state.productList].sort(byTitle)
    if (reverse) state.productList.reverse()
  },
}

const state = {
  productList: [],
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})

export default createStore({
  actions,
  getters,
  mutations,
  state,
  strict: true,
  plugins: [vuexLocal.plugin],
})
