import VuexPersistence from 'vuex-persist'
import { createStore } from 'vuex'
import axios from 'axios'

import { byActive, byCategory, byId, byPrice, byStock, byTitle, filterProducts } from './sortAndFilter'

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
  async getOrders({ commit }) {
    const orders = await axios.get('http://SITsApi.us-east-1.elasticbeanstalk.com/orders')
    commit('setOrderList', orders.data.data)
    return orders
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
  getFilteredProductList(state) {
    return filterProducts(state.productList, state.filters)
    // return
  },
  getProductPage: (state) => (page) => (items) => {
    const start = (page - 1) * items
    const end = page * items
    return state.productList.slice(start, end)
  },
  getLastPageNumber: (state) => (items) => {
    return Math.ceil(state.productList.length / items)
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
}

const mutations = {
  setFilters(state, filters) {
    state.filters = filters
  },
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
  setOrderList(state, orders) {
    state.orderList = orders
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
