<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { Socket } from 'socket.io-client'
import type { ScrollbarInstance, TimelineInstance } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import type { Message } from '../types'
import { useMainStore, useSocketStore } from '@/store'
import { pingSocket } from '@/utils'
import LIcon from '@/components/LIcon.vue'

const msg = ref('')
const socket = useSocketStore().socket
const mainStore = useMainStore()
const router = useRouter()
const { selectedTargetId, selectedChannelName, selectedChatRoomId, selectedChannelType } = storeToRefs(mainStore)

pingSocket(socket as Socket)

function sendMessage() {
  socket.send({
    to: selectedTargetId.value,
    msg: msg.value,
    timestamp: Date.now(),
  })
  msg.value = ''
}

const rawMessageList = ref<Message[]>([])
const scrollBar = ref<ScrollbarInstance>()
const messageContainer = ref<TimelineInstance>()

socket.on('message', (msg) => {
  rawMessageList.value.push(msg)
  scrollBar.value?.scrollTo({
    top: messageContainer.value?.$el.scrollHeight + 78,
  })
})

watch(selectedTargetId, () => {
  scrollBar.value?.scrollTo({
    top: messageContainer.value?.$el.scrollHeight + 78,
  })
}, {
  flush: 'post',
})

const targetMessageList = computed(() => rawMessageList.value
  .filter(m => m.to === selectedTargetId.value)
  .map((m) => {
    m.calcTime = new Date(m.timestamp).toLocaleTimeString('zh-CN')
    return m
  }))

const toggles = reactive({
  memberListDrawer: false,
})

onMounted(() => {
  if (selectedTargetId.value === undefined) {
    router.push({
      name: 'Home',
    })
  }
})
</script>

<template>
  <a-layout v-if="selectedChatRoomId !== undefined && selectedTargetId !== undefined" class="p-x-3 bg-bluegray-1 dark:bg-black">
    <a-layout-header class="h-45px mt-1">
      <div class="flex justify-between p-x-1">
        <div>
          <LIcon v-if="selectedChannelType === 'TEXT'" name="TEXT" class="vertical-bottom" />
          <LIcon v-if="selectedChannelType === 'AUDIO'" name="AUDIO" class="vertical-bottom" />
          <span>{{ selectedChannelName }}</span>
        </div>
        <div>
          <LIcon name="MEMBER" class="hover:cursor-pointer hover:color-black" @click="toggles.memberListDrawer = true" />
        </div>
      </div>
    </a-layout-header>
    <a-layout-content>
      <a-scrollbar ref="scrollBar" style="height: calc(100vh - 95px); overflow: auto;">
        <a-timeline ref="messageContainer" direction="vertical">
          <a-timeline-item v-for="m in targetMessageList" :key="m.timestamp" :label="`${m.calcTime}`">
            {{ m.from }}:{{ m.msg }}
          </a-timeline-item>
        </a-timeline>
      </a-scrollbar>
      <a-input v-model="msg" class="border-blue-3" size="large" type="text" placeholder="想和大家说点什么？" @press-enter="sendMessage" />
    </a-layout-content>
  </a-layout>
</template>

<style scoped>

</style>
