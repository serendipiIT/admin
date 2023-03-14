import VuexPersistence from 'vuex-persist'
import { createStore } from 'vuex'
import axios from 'axios'

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
  async getOrders({ commit }) {
    const orders = await axios.get('http://SITsApi.us-east-1.elasticbeanstalk.com/orders')
    commit('setOrderList', orders.data.data)
    return orders
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
  setProductList(state, products) {
    state.productList = products
  },
  sortById(state, reverse = false) {
    state.productList = state.productList
      .map((product) => {
        return {
          ...product,
          id: Number(product.id),
        }
      })
      .sort(byId)
    if (reverse) state.productList.reverse()
  },
  sortByPrice(state, reverse = false) {
    state.productList = state.productList
      .map((product) => {
        return {
          ...product,
          price: Number(product.price),
        }
      })
      .sort(byPrice)
    if (reverse) state.productList = state.productList.reverse()
  },
  sortByStock(state, reverse = false) {
    state.productList = state.productList = state.productList
      .map((product) => {
        return {
          ...product,
          stock: Number(product.stock),
        }
      })
      .sort(byStock)
    if (reverse) state.productList.reverse()
  },
  sortByTitle(state, reverse = false) {
    state.productList = [...state.productList].sort(byTitle)
    if (reverse) state.productList.reverse()
  },
  setOrderList(state, orders) {
    state.orderList = orders
  },
}

const state = {
  productList: [],
  orderList: [],
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
