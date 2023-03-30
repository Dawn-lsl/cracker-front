import { defineStore } from 'pinia'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

const useSocketStore = defineStore('socket', () => {
  const socket: Socket = io('http://localhost:3000', {
    auth: {
      token: localStorage.getItem('token'),
    },
  })

  return {
    socket,
  }
})

export {
  useSocketStore,
}
