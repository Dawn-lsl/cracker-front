import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ChatRoomDetail } from '@/store/modules/main/types'
import * as chatRoomApi from '@/api/chatRoom'

export const useMainStore = defineStore('main', () => {
  const selectedChatRoomId = ref('')
  const selectedChatRoomDetail = ref<ChatRoomDetail>()
  const selectedChannelId = ref('')
  const chatRoomList = ref<ChatRoomDetail[]>([])

  function getMyChatRoomList() {
    return chatRoomApi.getMyChatRoomList().then(({ data }) => {
      chatRoomList.value = data
    }).catch(err => console.error(err))
  }

  return {
    selectedChatRoomId,
    selectedChatRoomDetail,
    selectedChannelId,
    chatRoomList,
    getMyChatRoomList,
  }
})
