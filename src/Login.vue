<template lang="pug">
div(class="w-full h-full flex items-center justify-center")
  div(class="shrink-0 p-8 w-100 border flex flex-col items-center justify-center space-y-4")
    h1(class="text-[2rem] text-[#24292e]") hello
    label 用户名
      input(v-model="userInfo.name" class="ml-4 border")
    label 密码**
      input(v-model="userInfo.password" class="ml-4 border")
    button(class="py-2 px-10 text-white bg-[#24292e] rounded-md" @click="loginHandle") login in
    a(href="/api/login/github" class="py-2 px-10 text-white bg-[#24292e] rounded-md") github login
</template>

<script setup>
import {reactive} from 'vue'
import router from './router'
import {fetchUserInfo} from './model/user'
import {isEmptyObject} from './utils'

const userInfo = reactive({
  name: '',
  password: '',
})

async function loginHandle () {
  const data = await fetchUserInfo(userInfo)
  if (!isEmptyObject(data)) await router.replace('/')
}
</script>