<template lang="pug">
button(v-for="(_, i) of 16" class="flex-grow p-4 cursor-pointer" style="flex-basis: 25%;" @click="clickHandle(i)") {{i % 12 + 1}}月
</template>

<script setup>
import {inject, toRefs} from 'vue'
import {setMonth} from 'date-fns'

const {viewValue, addCount} = toRefs(inject('useDateState'))

function clickHandle (month) {
  viewValue.value = setMonth(viewValue.value, month)
  addCount.value()
}
</script>