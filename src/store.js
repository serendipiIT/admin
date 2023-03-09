import VuexPersistence from 'vuex-persist'
import { createStore } from 'vuex'

import { byId, byPrice, byStock, byTitle } from './sortAndFilter'

const actions = {
  async getProducts({ commit }) {
    const products = (await (await fetch('http://SITsApi.us-east-1.elasticbeanstalk.com/products')).json()).data
    const productsFixedKeys = products
      .filter((product) => product.color && product.size)
      .map((product) => {
        return {
          ...product,
          size: product.size.split(','),
          color: product.color.split(','),
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
  sortById(state) {
    state.productList = [...state.productList].sort(byId)
  },
  sortByPrice(state) {
    state.productList = [...state.productList].sort(byPrice)
  },
  sortByStock(state) {
    state.productList = [...state.productList].sort(byStock)
  },
  sortByTitle(state) {
    state.productList = [...state.productList].sort(byTitle)
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
