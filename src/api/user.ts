import axios from 'axios'

export interface LoginData {
  userId: string
  password: string
}

export interface RegisterData {
  userId:string
  username: string
  password: string
  email: string
  code: string
}

interface loginRes {
  token: string
}
// 登录
export function login(loginData: LoginData) {
  return axios.post<loginRes>('/users/login', loginData)
}
// 注册
export function register(registerData: RegisterData) {
  return axios.post('/users', registerData)
}
// 发送验证码
export function sendEmail(to: string) {
  return axios.post('/user/email', { to })
}
// 获取用户信息
export function userProfile(id: string) {
  return axios.get(`/api/user/${id}`)
}
// 获取自己信息
export function profile() {
  return axios.get('/user')
}
// 加入聊天室
export function joinChatRoom(roomId: string) {
  return axios.post(`/user/chatRoom/${roomId}`)
}
// 退出聊天室
export function quitChatRoom(roomId: string) {
  return axios.delete(`/user/chatRoom/${roomId}`)
}
