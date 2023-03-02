import { createStore } from 'vuex'

const mutations = {
  /*  updateProducts(state, result) {
    state.products = result
  },*/
}

const state = {
  /*products: JSON.parse(localStorage.getItem('products')),*/
}

export default createStore({
  mutations,
  state,
  strict: true,
})

/*
getProducts = () => {
  fetch({
  method: 'get',
  url: `http://SITsApi.us-east-1.elasticbeanstalk.com/products`,
  })
  .then((response) => {
    localStorage.setItem('products', JSON.stringify(commits.data))
  })
}


fetch('http://SITsApi.us-east-1.elasticbeanstalk.com/products')
  .then(response => {
  console.log(response.data.data)
  })


  let url = 'http://SITsApi.us-east-1.elasticbeanstalk.com/products';
let response = await fetch(url)
let commits = await response.json()

console.log(commits)



*/
