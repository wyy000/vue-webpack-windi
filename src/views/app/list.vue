<template lang="pug">
h1 Reading list
div(class="flex flex-col")
  div(v-for="it in refList") {{it}}
</template>

<script setup>
import {computed} from 'vue'
import {list, fetchList} from '../../model/app'

const refList = computed(() => list.value)

async function queryList () {
  await fetchList()
}

queryList()
</script>