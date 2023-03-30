<script setup lang="ts">
import { IconUser, IconUserGroup, IconPlus, IconEdit } from '@arco-design/web-vue/es/icon'
import { onBeforeMount, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/store'
import { createChatRoom } from '@/api/chatRoom'
const mainStore = useMainStore()
const { chatRoomList, selectedChatRoomId } = storeToRefs(mainStore)

const visible = ref(false);

const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  createChatRoom(form).then( (res: any) => {
    if(res.code == 1){
      mainStore.getMyChatRoomList()
      visible.value = false;
    }
  })

};
const handleCancel = () => {
  visible.value = false;
}


onBeforeMount(() => {
  mainStore.getMyChatRoomList()
})

function chooseChatRoom(chatRoomId: string | undefined) {
  selectedChatRoomId.value = chatRoomId
}

function backSpace() {
  selectedChatRoomId.value = undefined
}
type formModel = {
  roomId: string,
  name: string,
  img: any,
}
const form = reactive<formModel>({
  roomId: '',
  name: '',
  img: '',
});
let file = ref<any>()
const onChange = (_:any, currentFile:any) => {
      file.value = {
        ...currentFile,
        // url: URL.createObjectURL(currentFile.file),
      };
      console.log(file);
      var reader=new FileReader();
      reader.readAsDataURL(currentFile.file);
      reader.onload = function(e)
      {
          form.img = this.result
      }
    };
const onProgress = (currentFile:any) => {
  file.value = currentFile;
};
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
      <a-menu-item v-for="cr in chatRoomList" :key="cr?.id" @click="chooseChatRoom(cr?.id)" style="padding: 0 3px;">
        <template #icon>
          <!-- <IconUserGroup /> -->
          <img :src="cr?.img" style="width: 36px; height: 35px;border-radius: 6px;">
        </template>
        {{ cr?.name }}
      </a-menu-item>
      <a-menu-item key="add" @click="handleClick">
        <template #icon>
          <IconPlus />
        </template>
        添加聊天室
      </a-menu-item>
    </a-menu>
  </a-scrollbar>
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      自定义您的聊天室
    </template>
    <div>一个名称以及一个图标就能赋予您的服务器个性。之后，您可以随时进行变更。</div>
    <a-form :model="form">
      <a-form-item field="img" label="头像">
        <a-space direction="vertical" :style="{ width: '100%' }">
          <a-upload
            :fileList="file ? [file] : []"
            :show-file-list="false"
            :auto-upload="false"
            @change="onChange"
            @progress="onProgress"
          >
            <template #upload-button>
              <div
                :class="`arco-upload-list-item${
                  file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
                }`"
              >
                <div
                  class="arco-upload-list-picture custom-upload-avatar"
                  v-if="file && file.url"
                >
                  <img :src="file.url" />
                  <div class="arco-upload-list-picture-mask">
                    <IconEdit />
                  </div>
                  <a-progress
                    v-if="file.status === 'uploading' && file.percent < 100"
                    :percent="file.percent"
                    type="circle"
                    size="mini"
                    :style="{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translateX(-50%) translateY(-50%)',
                    }"
                  />
                </div>
                <div class="arco-upload-picture-card" v-else>
                  <div class="arco-upload-picture-card-text">
                    <IconPlus />
                    <div style="margin-top: 10px; font-weight: 600">Upload</div>
                  </div>
                </div>
              </div>
            </template>
          </a-upload>
        </a-space>
      </a-form-item>
      <a-form-item field="roomId" label="聊天室ID">
        <a-input v-model="form.roomId" />
      </a-form-item>
      <a-form-item field="name" label="聊天室名称">
        <a-input v-model="form.name" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="scss" scoped>
:deep(.arco-menu-inner) {
  &::-webkit-scrollbar {
    width: 0 !important
  }
}
</style>
