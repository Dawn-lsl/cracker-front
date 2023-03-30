import axios from 'axios'
export function getMyChatRoomList() {
  return axios.get('/api/chatRoom')
}

export function getChatRoomDetail(id: string) {
  return axios.get(`/api/chatRoom/${id}`)
}
