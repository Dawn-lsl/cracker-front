import { createApp } from 'vue'
import { connect } from '@vue/devtools'
import ArcoVue from '@arco-design/web-vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import './api/interceptor'
import './style.css'
import '@arco-design/web-vue/dist/arco.css'
import 'uno.css'

connect()

const app = createApp(App)
app.use(ArcoVue)
  .use(router)
  .use(pinia)
app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
