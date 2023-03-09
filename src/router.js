import { createRouter, createWebHashHistory } from 'vue-router'

import DashboardView from './views/DashboardView.vue'
import ProductsView from './views/ProductsView.vue'
import CategoriesView from './views/CategoriesView.vue'
import OrdersView from './views/OrdersView.vue'
import CustomersView from './views/CustomersView.vue'
import DesignView from './views/DesignView.vue'
import PagesView from './views/PagesView.vue'
import IconsView from './views/IconsView.vue'
import EditProductView from './views/EditProductView.vue'
import CreateNewView from './views/CreateNewView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'home',
      component: DashboardView,
      path: '/',
      meta: { title: 'Home' },
    },
    {
      name: 'Products',
      component: ProductsView,
      path: '/products',
      meta: { title: 'Products' },
    },
    {
      name: 'CreateNew',
      component: CreateNewView,
      path: '/create',
      meta: {
        title: 'CreateNew',
      },
    },
    {
      name: 'EditProduct',
      component: EditProductView,
      path: '/products/:id',
      meta: { title: 'EditProduct' },
    },
    { name: 'CreateNew', component: CreateNewView, path: '/create', meta: { title: 'CreateNew' } },
    {
      name: 'Categories',
      component: CategoriesView,
      path: '/CategoriesView',
      meta: { title: 'Categories' },
    },
    {
      name: 'Orders',
      component: OrdersView,
      path: '/OrdersView',
      meta: { title: 'Orders' },
    },
    {
      name: 'Customers',
      component: CustomersView,
      path: '/CustomersView',
      meta: { title: 'Customers' },
    },
    {
      name: 'Design',
      component: DesignView,
      path: '/DesignView',
      meta: { title: 'Design' },
    },
    {
      name: 'Pages',
      component: PagesView,
      path: '/PagesView',
      meta: { title: 'Pages' },
    },
    {
      name: 'Icons',
      component: IconsView,
      path: '/IconsView',
      meta: { title: 'Icons' },
    },
  ],
})
