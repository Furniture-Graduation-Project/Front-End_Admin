import { io, Socket } from 'socket.io-client'

const socket: Socket = io(import.meta.env.VITE_API_SOCKET, {
  transports: ['websocket', 'polling'],
  reconnection: true
})

export const SocketService = {
  get: () => socket,
  disconnect: () => {
    socket.disconnect()
  },
  on: (event: string, callback: (...args: any[]) => void) => {
    socket.on(event, callback)
  },
  off: (event: string, callback: (...args: any[]) => void) => {
    socket.off(event, callback)
  }
}
