import VuexPersistence from 'vuex-persist'
import { createStore } from 'vuex'
import axios from 'axios'

import { filterProducts, sortBy } from './sortAndFilter'

const actions = {
  async getProducts({ commit }) {
    const products = (await (await fetch('http://SITsApi.us-east-1.elasticbeanstalk.com/products')).json()).data
    const productsFixedKeys = products
      .filter((product) => product.color && product.size)
      .map((product) => {
        return {
          ...product,
          active: product.active === 1 ? true : false,
          color: product.color.split(','),
          id: Number(product.id),
          price: Number(product.price),
          size: product.size.split(','),
          stock: Number(product.stock),
        }
      })
    commit('setProductList', productsFixedKeys)
  },
  async getOrders({ commit }) {
    const orders = await axios.get('http://SITsApi.us-east-1.elasticbeanstalk.com/orders')
    commit('setOrderList', orders.data.data)
    return orders
  },

  async getJournals ({ commit }) {
    const journals = await axios.get('http://SITsApi.us-east-1.elasticbeanstalk.com/journal')
    commit('setJournalList' , journals.data.data)
    return journals
  },

  async getColumns({ commit }) {
    const response = await fetch('http://SITsApi.us-east-1.elasticbeanstalk.com/products/columns')
    const result = await response.json()
    const columns = await result.data
    for (let index = 0; index < columns.length; index++) {
      const element = columns[index]
      if (element.Field === 'category2') {
        let test = element.Type
        let categories = test.slice(4, -1).replaceAll("'", '').split(',')
        commit('setCategories', categories)
      }
    }
  },
}

const getters = {
  filteredProductList(state) {
    return state.filteredProductList
  },
  getOrderedProducts: (state) => (id) => {
    const productsOnOrder = state.orderList.filter((order) => order.order_id === id)
    if (productsOnOrder.length > 0) return JSON.parse(productsOnOrder[0].products)
    else return 'No order found.'
  },
  getSpecificOrder: (state) => (id) => {
    const order = state.orderList.filter((order) => order.order_id === id)
    return order.length > 0 ? order : null
  },
  getAllJournals: (state) => (id) => {
    console.log("KÖRS")
    const journal = state.journalList.filter((journal) => journal.id === id)
    return journal.length > 0 ? journal[0]: ''
  }
}

const mutations = {
  removeAllFilters(state) {
    state.filteredProductList = [...state.productList]
  },
  reverse(state) {
    state.filteredProductList.reverse()
  },
  setFilters(state, filters) {
    state.filters = filters

    state.filteredProductList = filterProducts(state.productList, state.filters) || []
  },
  setProductList(state, products) {
    state.productList = products
  },
  sort(state, key) {
    state.filteredProductList.sort(sortBy(key))
  },
  setOrderList(state, orders) {
    state.orderList = orders
  },

  setJournalList(state, journals) {
    state.journalList = journals
  },
  setCategories(state, result) {
    // console.log(result)
    state.categories = result
  },
}

const state = {
  filteredProductList: [],
  filters: {},
  productList: [],
  orderList: [],
  journalList: [],
  categories: [],
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
