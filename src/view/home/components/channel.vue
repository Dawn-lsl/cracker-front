<script lang="ts" setup>
import { IconDown } from '@arco-design/web-vue/es/icon'
import { reactive, ref, watchEffect } from 'vue'
import { useToggle } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { getChatRoomDetail } from '@/api/chatRoom'
import { createchannelGroup } from '@/api/channelGroup'
import { quitChatRoom } from '@/api/user'
import { useMainStore, useSocketStore } from '@/store'
import type { Channel, ChannelGroup } from '@/store/modules/main/types'
import LIcon from '@/components/LIcon.vue'
import ContextMenu from '@/components/ContextMenu.vue'

const mainStore = useMainStore()
const socket = useSocketStore().socket
const { selectedChatRoomId, selectedChatRoomDetail, selectedTargetId, selectedChannel } = storeToRefs(mainStore)
const router = useRouter()

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
  const res: any = await quitChatRoom(selectedChatRoomId.value!)
  toggle()
  if (res.code === 1) {
    selectedChatRoomId.value = undefined
    await mainStore.getMyChatRoomList()
    return true
  }
  return false
}

function chooseChannel(channel: Channel) {
  selectedChannel.value = channel
  selectedTargetId.value = channel.id
  socket.emit('join-channel', selectedTargetId.value)
  router.replace({
    path: `/home/message/${channel.id}`,
  })
}

const [addChannelGroupModal, toggleCG] = useToggle(false)
const channelGroupform = reactive<any>({
  name: '',
  roomId: '',
})
async function creartCG (){
  channelGroupform.roomId = selectedChatRoomId.value
  await createchannelGroup(channelGroupform).then(async (res: any) => {
    if(res.code == 1){
      loading.value = true
      const { data } = await getChatRoomDetail(selectedChatRoomId.value!)
      selectedChatRoomDetail.value = data
      chatRoomName.value = selectedChatRoomDetail.value!.name
      groupList.value = selectedChatRoomDetail.value!.group
      loading.value = false
    }
  })
  toggleCG()
}
const context = ref({
  contextConfig: {
    offsetLeft: 0,
    offsetTop: 0,
    menuList: [
      // 无需按键监听可以不传keyCode
      {label: '编辑', id: 1,des: 'E',keyCode: 69,emitType: 'edit' },
      {label: '删除', id: 2,des: 'D',keyCode: 68,emitType: 'del' },
      {label: '撤回', id: 3,des: 'R',keyCode: 82,emitType: 'return' }
    ]
  },
  contextShow: false
})

function onContextMenu({ clientX, clientY }: any) {
    Object.assign(context.value ,{
        contextConfig: {
          offsetLeft: clientX,
          offsetTop: clientY,
          menuList: [
            // 无需按键监听可以不传keyCode
            {label: '编辑', id: 1,des: 'E',keyCode: 69,emitType: 'edit' },
            {label: '删除', id: 2,des: 'D',keyCode: 68,emitType: 'del' },
            {label: '撤回', id: 3,des: 'R',keyCode: 82,emitType: 'return' }
          ]
        },
    contextShow: true
  })
}
function onEdit(){
  console.log(123321);
}
</script>

<template>
  <div v-if="selectedChatRoomId === undefined">
    none
  </div>
  <a-spin v-else :loading="loading">
    <a-layout>
      <a-layout-header>
        <a-dropdown :popup-max-height="false" class="w-175px">
          <a-button class="w-100% relative">
            {{ chatRoomName }}
            <IconDown />
          </a-button>
          <template #content>
            <a-doption
              class="c-white-500 important-hover-bg-white-400 important-hover-c-blue"
              @click="toggleCG()"
            >
              新建频道组
            </a-doption>
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
            class="w-200px"
            :default-selected-keys="groupList"
          >
            <a-sub-menu v-for="group in groupList" :key="group.id" @contextmenu.prevent="onContextMenu">
                <template #title>
                  {{ group.name }}
                </template>
              <a-menu-item v-for="channel in group.channel" :key="channel.id" @click="chooseChannel(channel)">
                <template #icon>
                  <LIcon v-if="channel.type === 'TEXT'" name="TEXT" />
                  <LIcon v-if="channel.type === 'AUDIO'" name="AUDIO" />
                </template>
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
  <a-modal
    :visible="addChannelGroupModal" title="新建频道组" :mask-closable="true"
    ok-text="新建" cancel-text="取消"
    @ok="creartCG"
    @cancel="toggleCG()"
  >
    <a-form :model="channelGroupform">
      <a-form-item field="name" label="频道组名称">
        <a-input v-model="channelGroupform.name" />
      </a-form-item>
    </a-form>
  </a-modal>
  <context-menu 
        :context-menu-show.sync="context.contextShow" 
        :config="context.contextConfig"
        @edit="onEdit"
  >
  </context-menu>
</template>

<style lang="scss" scoped>
.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
:deep(.arco-menu .arco-menu-item .arco-menu-icon) {
  margin-right: 4px;
}
</style>
