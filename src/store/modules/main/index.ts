import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Channel, ChatRoomDetail, UserProfile } from '@/store/modules/main/types'
import * as chatRoomApi from '@/api/chatRoom'

export const useMainStore = defineStore('main', () => {
  const selectedChatRoomId = ref<string | undefined>()
  const selectedChatRoomDetail = ref<ChatRoomDetail>()
  const selectedTargetId = ref<string | undefined>()
  const chatRoomList = ref<ChatRoomDetail[]>([])
  const selectedChannel = ref<Channel>()

  const userProfile = ref<UserProfile>()

  function getMyChatRoomList() {
    return chatRoomApi.getMyChatRoomList().then(({ data }) => {
      chatRoomList.value = data
    }).catch(err => console.error(err))
  }

  const selectedChatRoomName = computed(() => selectedChatRoomDetail.value?.name)
  const selectedChannelType = computed(() => selectedChannel.value?.type)
  const selectedChannelName = computed(() => selectedChannel.value?.name)

  return {
    selectedChatRoomId,
    selectedChatRoomDetail,
    selectedTargetId,
    chatRoomList,
    selectedChatRoomName,
    selectedChannel,
    selectedChannelType,
    selectedChannelName,
    userProfile,
    getMyChatRoomList,
  }
})
