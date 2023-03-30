<script setup lang="ts">
import { IconUser, IconUserGroup } from '@arco-design/web-vue/es/icon'
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/store'

const mainStore = useMainStore()
const { chatRoomList, selectedChatRoomId } = storeToRefs(mainStore)

onBeforeMount(() => {
  mainStore.getMyChatRoomList()
})

function chooseChatRoom(chatRoomId: string) {
  selectedChatRoomId.value = chatRoomId
}

function backSpace() {
  selectedChatRoomId.value = ''
}
</script>

<template>
  <a-scrollbar style="height: 100vh; overflow: auto">
    <a-menu collapsed mode="vertical" :default-selected-keys="['space']" :collapsed-width="50">
      <a-menu-item key="space" @click="backSpace">
        <template #icon>
          <IconUser />
        </template>
        私信
      </a-menu-item>
      <a-menu-item v-for="(cr) in chatRoomList" :key="cr.id" @click="chooseChatRoom(cr.id)">
        <template #icon>
          <IconUserGroup />
        </template>
        {{ cr.name }}
      </a-menu-item>
    </a-menu>
  </a-scrollbar>
</template>

<style lang="scss" scoped>
:deep(.arco-menu-inner) {
  &::-webkit-scrollbar {
    width: 0 !important
  }
}
</style>
