import { io } from 'socket.io-client'
import type { Plugin } from 'vue'

const plugin: Plugin = (app) => {
  const socket = io('http://localhost:3000')
  app.config.globalProperties.$socket = socket
}

export default plugin
