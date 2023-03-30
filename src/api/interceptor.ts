import axios from 'axios'
import type { AxiosRequestHeaders } from 'axios'
import { Message, Modal } from '@arco-design/web-vue'

axios.defaults.baseURL = 'http://localhost:3000'

export interface HttpResponse<T = unknown> {
  code: number
  msg: string
  data?: T | Record<string, any>
  errors?: Record<string, any>
}

axios.interceptors.request.use(
  (config) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = localStorage.getItem('token')
    if (token) {
      if (!config.headers)
        config.headers = {} as AxiosRequestHeaders

      config.headers.Authorization = token
      // config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODIwMzg4MjZmZWY4NjIzOGY5NzQ3YSIsImlhdCI6MTY2OTQ2NDk5MX0.GDuOBra8uemkYin1pFuzYXA1iWjFzzsKojykGrGpYZc'
    }
    return config
  },
  (error) => {
    // do something
    return Promise.reject(error)
  },
)
// add response interceptors
axios.interceptors.response.use(
  /**
     * This intercept handle response status code with 2xx
     * @param response
     */
  (response) => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      Message.error({
        content: res.msg || 'Error',
        duration: 5 * 1000,
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        [50008, 50012, 50014].includes(res.code)
                && response.config.url !== '/api/user/info'
      ) {
        Modal.error({
          title: 'Confirm logout',
          content: 'You have been logged out, you can cancel to stay on this page, or log in again',
          okText: 'Re-Login',
          async onOk() {
            window.location.reload()
          },
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  /**
     * This function handle response status code without 2xx
     * @param error
     */
  (error) => {
    Message.error({
      content: error.response.status === 401 ? '>﹏< 登录过期！请重新登录！' : '服务器出错啦！',
      // onClose() {
      //   window.location.reload()
      // },
      // duration: 2 * 1000,
    })
  },
)
