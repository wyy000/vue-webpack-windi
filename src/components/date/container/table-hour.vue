<template lang="pug">
button(
  v-for="(_, i) of 24"
  :class="['flex-grow flex-shrink-0 p-4 cursor-pointer border border-white hover:border-fuchsia-500 hover:text-fuchsia-500', i === getHours(viewValue) ? 'text-fuchsia-500' : 'text-blue-gray-900']"
  style="flex-basis: 16%;"
  @click="clickHandle(i)"
) {{i}}
button(v-for="(_, i) of 6" class="flex-grow flex-shrink-0 p-4 text-blue-gray-500 cursor-pointer border border-white hover:border-fuchsia-500 hover:text-fuchsia-500" style="flex-basis: 16%;" @click="clickHandle(i + 24)") {{i}}
</template>

<script setup>
import {inject, toRefs} from 'vue'
import {getHours, setHours} from 'date-fns'

const {viewValue, addCount} = toRefs(inject('useDateState'))

function clickHandle (hour) {
  viewValue.value = setHours(viewValue.value, hour)
  addCount.value()
}
</script>