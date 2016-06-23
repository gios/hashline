import io from 'socket.io-client'
export default io('', { path: '/api/chat' })