import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia
export * from './modules/main'
export * from './modules/socket'
