<script setup lang="ts">
import LIcon from '@/components/LIcon.vue'

defineProps<{
  msg: string
}>()
</script>

<template>
  <a-result status="error" :title="msg">
    <template #icon>
      <LIcon name="STORM" />
    </template>
    <template #extra>
      <a-button type="primary" @click="$router.push({ name: 'Home' })">
        回主页再试试
      </a-button>
    </template>
  </a-result>
</template>
