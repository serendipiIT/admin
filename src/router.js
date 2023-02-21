import { createRouter, createWebHashHistory } from "vue-router"

import ApiProducts from "./views/ApiProducts.vue"
import HomeView from "./views/HomeView.vue"

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: "home",
      component: HomeView,
      path: "/",
      meta: { title: "Home" },
    },
    {
      name: "apiProducts",
      component: ApiProducts,
      path: "/apiProducts",
      meta: { title: "apiProducts" },
    },
  ],
})
