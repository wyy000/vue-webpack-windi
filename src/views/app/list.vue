<template lang="pug">
h1 Reading list
div(v-if="showList" class="flex flex-col")
  div(v-for="it in refList" :key="it.id")
    div {{it.name}}
    div.flex.justify-center
      input(v-model="it.name" class="border")
      button(@click="updateShop(it)") 修改
      button(@click="fetchDeleteShop(it.id)") 删除
</template>

<script setup>
import {computed} from 'vue'
import {list, fetchList, updateShop as fetchUpdateShop, deleteShop as fetchDeleteShop} from '../../model/app'

const refList = computed(() => list.value)
const showList = computed(() => !!list.value.length)

async function updateShop (params) {
  await fetchUpdateShop(params)
}

async function queryList () {
  await fetchList()
}

queryList()
</script>