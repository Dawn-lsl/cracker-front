import axios from 'axios'

export interface LoginData {
  username: string
  password: string
}

export interface RegisterData {
  code: string
  email: string
  password: string
  username: string
}

interface loginRes {
  token: string
}

export function login(loginData: LoginData) {
  return axios.post<loginRes>('/api/user/login', loginData)
}

export function register(registerData: RegisterData) {
  return axios.post('/api/user/register', registerData)
}

export function sendEmail(to: string) {
  return axios.post('/api/user/sendmail', { to })
}

export function profile() {
  return axios.get('/api/user')
}

export function joinChatRoom(roomId: string) {
  return axios.post(`/api/user/chatRoom/${roomId}`)
}

export function quitChatRoom(roomId: string) {
  return axios.delete(`/api/user/chatRoom/${roomId}`)
}
