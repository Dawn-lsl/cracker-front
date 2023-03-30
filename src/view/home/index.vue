<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import LeftGroup from './components/group.vue'
import LeftChannel from './components/channel.vue'
import { profile } from '@/api/user'
import { useMainStore } from '@/store'
import LIcon from '@/components/LIcon.vue'

// const { userProfile } = storeToRefs(useMainStore())

// onMounted(() => {
//   profile().then(({ data }) => {
//     userProfile.value = data
//   })
// })
</script>

<template>
  <a-layout>
    <a-layout-sider style="width: 50px; height: 100%">
      <LeftGroup />
    </a-layout-sider>
    <a-layout-sider style="width: 200px; height: 100%">
      <LeftChannel />
    </a-layout-sider>
    <a-layout>
      <router-view v-slot="{ Component, route }">
        <a-result v-if="route.path === '/home'" :status="null" class="bg-bluegray-1 h-full dark:bg-black">
          <template #default>
            <LIcon name="CANDY" />
            <div class="font-serif color-gray dark:c-white">
              要不随便看点什么？
            </div>
          </template>
        </a-result>
        <transition v-else :name="route.meta.transition" mode="out-in">
          <component
            :is="Component"
            :key="route.meta.usePathKey ? route.path : undefined"
          />
        </transition>
      </router-view>
    </a-layout>
  </a-layout>
</template>

<style scoped>
:deep(.arco-result-content) {
  margin-top: 50%;
  transform: translateY(-50%);
}
</style>
