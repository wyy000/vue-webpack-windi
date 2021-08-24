<template lang="pug">
button(v-for="it of week" class="flex-grow flex-shrink-0 p-4 cursor-pointer" style="flex-basis: 14%;") {{it}}
button(
  v-for="it of refDays"
  :class="['flex-grow flex-shrink-0 p-4 cursor-pointer border border-white hover:border-fuchsia-500 hover:text-fuchsia-500', textStyle(it)]"
  style="flex-basis: 14%;"
  @click="clickHandle(it)"
) {{getDate(it)}}
</template>

<script setup>
import {computed, inject, toRefs, watch} from 'vue'
import {addDays, getDate, getDay, getMonth, getYear, isSameDay, isSameMonth, isSameYear, setDate, startOfMonth} from 'date-fns'

const {viewValue, addCount} = toRefs(inject('useDateState'))

const week = ['日', '一', '二', '三', '四', '五', '六']
const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

watch(() => viewValue.value, value => {
  const year = getYear(viewValue)
  const month = getMonth(viewValue)
  days[1] = month === 1 && (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28
})

const refContent = computed(() => addDays(startOfMonth(viewValue.value), -getDay(startOfMonth(viewValue.value)) % 7))
const refDays = computed(() => Array.from({length: 42}).map((_, i) => addDays(refContent.value, i)))

function textStyle (day) {
  return isSameYear(viewValue.value, day) && isSameMonth(viewValue.value, day)
    ? isSameDay(viewValue.value, day)
      ? 'text-fuchsia-500'
      : 'text-blue-gray-900'
    : 'text-blue-gray-500'
}

function clickHandle (day) {
  viewValue.value = setDate(viewValue.value, getDate(day))
  addCount.value()
}
</script>

<style scoped>

</style>