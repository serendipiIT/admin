import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import shortText from './directives/shortText'
import store from './store'

const app = createApp(App)
app.directive('shortText', shortText)
app.use(router)
app.use(store)
app.mount('#app')
