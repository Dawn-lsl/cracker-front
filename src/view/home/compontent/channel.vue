<script lang="ts" setup>
import { IconDown } from '@arco-design/web-vue/es/icon'
import { ref, watchEffect } from 'vue'
import { useToggle } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { getChatRoomDetail } from '@/api/chatRoom'
import { quitChatRoom } from '@/api/user'
import { useMainStore } from '@/store'
import type { Channel, ChannelGroup } from '@/store/modules/main/types'

const mainStore = useMainStore()
const { selectedChatRoomId, selectedChatRoomDetail } = storeToRefs(mainStore)

const groupList = ref<(ChannelGroup & { channel: Channel[] })[]>([])
const loading = ref(false)
const chatRoomName = ref('')

watchEffect(async () => {
  if (!selectedChatRoomId.value)
    return
  loading.value = true
  const { data } = await getChatRoomDetail(selectedChatRoomId.value)
  selectedChatRoomDetail.value = data
  chatRoomName.value = selectedChatRoomDetail.value!.name
  groupList.value = selectedChatRoomDetail.value!.group
  loading.value = false
}, {
  flush: 'sync',
})

const [confirmModal, toggle] = useToggle(false)
async function quit() {
  const res: any = await quitChatRoom(selectedChatRoomId.value)
  toggle()
  if (res.code === 0) {
    selectedChatRoomId.value = ''
    await mainStore.getMyChatRoomList()
    return true
  }
  return false
}
</script>

<template>
  <div v-if="selectedChatRoomId === ''">
    none
  </div>
  <a-spin v-else :loading="loading">
    <a-layout>
      <a-layout-header>
        <a-dropdown :popup-max-height="false" style="width: 175px;">
          <a-button style="width: 100%;position: relative;">
            {{ chatRoomName }}
            <IconDown />
          </a-button>
          <template #content>
            <a-doption
              class="c-red-500 important-hover-bg-red-400 important-hover-c-white"
              @click="toggle()"
            >
              离开该社群
            </a-doption>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content>
        <a-scrollbar style="height:calc(100vh - 32px);overflow: auto;">
          <a-menu
            style="width: 200px; height: 100%"
          >
            <a-sub-menu v-for="group in groupList" :key="group.id">
              <template #title>
                {{ group.name }}
              </template>
              <a-menu-item v-for="channel in group.channel" :key="channel.id">
                {{ channel.name }}
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-scrollbar>
      </a-layout-content>
    </a-layout>
  </a-spin>
  <a-modal
    :visible="confirmModal" :title="`离开‘${chatRoomName}’`" :mask-closable="true"
    ok-text="离开" :ok-button-props="{
      class: 'important-bg-red-500',
    }" cancel-text="再想想"
    :on-before-ok="quit"
    @cancel="toggle()"
  >
    你真的要离开‘{{ chatRoomName }}’吗？
  </a-modal>
</template>

<style lang="scss" scoped>
.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
</style>
