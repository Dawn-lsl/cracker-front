import type { Socket } from 'socket.io-client'

export function pingSocket(socket: Socket) {
  socket.emit('ping', Date.now(), (response: unknown) => {
    const data = response as { spendTime: number; sendTime: number }
    /* eslint-disable no-console */
    console.log(`${Date.now() - data.sendTime + data.spendTime} ms`)
  })
}
