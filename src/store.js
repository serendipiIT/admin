import { createStore } from 'vuex'

const mutations = {}

const state = {
  products: localStorage.getItem('products') || null,
}

export default createStore({
  mutations,
  state,
  strict: true,
})
