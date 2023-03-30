import axios from 'axios'
// 获取当前用户聊天室列表
export function createchannelGroup(params:any) {
  return axios.post('/channelGroup', params)
}