<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { login } from '@/api/user'

const router = useRouter()
const form = reactive({
  userId: '',
  password: '',
})
const handleSubmit = () => {
  login({
    userId: form.userId,
    password: form.password,
  }).then((data: any) => {
    console.log(data)
    if (data.code === 1) {
      localStorage.setItem('userid', data.data.id)
      localStorage.setItem('token', data.data.token)
      router.push({
        name: 'Home',
      })
    }
  })
}
</script>

<template>
  <div>
    <a-form class="w-60 m-auto mt-25" :model="form" layout="vertical" @submit="handleSubmit">
      <div class="login-title">
        <h1>欢迎回来!</h1>
        <div>很高兴再次见到您！</div>
      </div>
      <a-form-item field="userId" :rules="{ required: true, message: '必须填写账号' }" label="账号名">
        <a-input v-model="form.userId" />
      </a-form-item>
      <a-form-item field="password" :rules="{ required: true, message: '必须填写密码' }" label="密码">
        <a-input-password v-model="form.password" />
      </a-form-item>
      <a-form-item>
        <a-button class="sub-button" long html-type="submit">
          登录
        </a-button>
      </a-form-item>
    </a-form>
    {{ form }}
  </div>
</template>

<style scoped>

</style>
