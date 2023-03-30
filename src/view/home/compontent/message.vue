<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const value = ref('')
    const text = ref('')

    return {
      value,
      text,
    }
  },
}
</script>

<template>
  <a-layout>
    <a-layout-header style="height: 45px">
      Header
    </a-layout-header>
    <a-layout-content>
      <a-scrollbar style="height: calc(100vh - 80px); overflow: auto;">
        <div style="height: 1200px" />
      </a-scrollbar>
      <a-mention v-model="value" :data="['Bytedance', 'Bytedesign', 'Bytenumner']" placeholder="enter something" />
    </a-layout-content>
  </a-layout>
</template>

<style scoped>

</style>
