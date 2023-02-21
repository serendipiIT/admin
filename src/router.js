import { createRouter, createWebHashHistory } from "vue-router"

import HomeView from "./views/HomeView.vue"
import ProductsView from "./views/ProductsView.vue"
import CategoriesView from "./views/CategoriesView.vue"
import OrdersView from "./views/OrdersView.vue"
import CustomersView from "./views/CustomersView.vue"
import DesignView from "./views/DesignView.vue"
import PagesView from "./views/PagesView.vue"

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
      name: "Products",
      component: ProductsView,
      path: "/ProductsView",
      meta: { title: "Products" },
    },
    {
      name: "Categories",
      component: CategoriesView,
      path: "/CategoriesView",
      meta: { title: "Categories" },
    },
    {
      name: "Orders",
      component: OrdersView,
      path: "/OrdersView",
      meta: { title: "Orders" },
    },
    {
      name: "Customers",
      component: CustomersView,
      path: "/CustomersView",
      meta: { title: "Customers" },
    },
    {
      name: "Design",
      component: DesignView,
      path: "/DesignView",
      meta: { title: "Design" },
    },
    {
      name: "Pages",
      component: PagesView,
      path: "/PagesView",
      meta: { title: "Pages" },
    },
  ],
})
