import axios from 'axios'
// 获取当前用户聊天室列表
export function getMyChatRoomList() {
  return axios.get('/chatRoom')
}
// 获取当前用户聊天室信息
export function getChatRoomDetail(id: string) {
  return axios.get(`/chatRoom/${id}`)
}
// 创建聊天室
export function createChatRoom(params:any) {
  return axios.post(`/chatRoom`,params)
}
