<script setup lang="ts">
import { onMounted, onUpdated } from 'vue'

const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
const darkMq = () => {
  if (darkThemeMq.matches)
    document.body.setAttribute('arco-theme', 'dark')
  else
    document.body.removeAttribute('arco-theme')
}

darkThemeMq.onchange = (e) => {
  if (e.matches)
    document.body.setAttribute('arco-theme', 'dark')
  else
    document.body.removeAttribute('arco-theme')
}

onMounted(darkMq)
onUpdated(darkMq)
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition" mode="out-in">
      <component
        :is="Component"
        :key="route.meta.usePathKey ? route.path : undefined"
      />
    </transition>
  </router-view>
</template>

<style scoped>

</style>
