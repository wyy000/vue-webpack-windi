<template lang="pug">
button(v-for="(_, i) of 16" :class="['flex-grow flex-shrink-0 p-4 cursor-pointer border border-white hover:border-fuchsia-500', {'text-fuchsia-500': getYear(viewValue) === year + i}, i > 9 ? 'text-blue-gray-500' : 'text-blue-gray-900']" style="flex-basis: 25%;" @click="clickHandle(year + i)") {{year + i}}
</template>

<script setup>
import {computed, inject, toRefs} from 'vue'
import {getYear, setYear} from 'date-fns'

const {viewValue, addCount} = toRefs(inject('useDateState'))

function clickHandle (year) {
  viewValue.value = setYear(viewValue.value, year)
  addCount.value()
}

const year = computed(() => getYear(viewValue.value) - getYear(viewValue.value) % 10)
</script>

<style scoped>

</style>