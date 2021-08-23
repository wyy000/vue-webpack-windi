<template lang="pug">
button(v-for="(_, i) of CELL_NUM" :class="['flex-grow flex-shrink-0 p-4 cursor-pointer border border-white hover:border-fuchsia-500', {'text-fuchsia-500': getSeconds(viewValue) === refRange + i}]" style="flex-basis: 16%;" @click="clickHandle(refRange + i)") {{refRange + i}}
</template>

<script setup>
import {inject, ref, toRefs, watch} from 'vue'
import {getSeconds, setSeconds} from 'date-fns'

const CELL_NUM = 30

const {viewValue, addCount} = toRefs(inject('useDateState'))
const useTurnPageState = inject('useTurnPageState')
const useSecondsState = inject('useSecondsState')

const refRange = ref(getSeconds(viewValue.value) >= CELL_NUM ? CELL_NUM : 0)

watch(() => useTurnPageState.value, (next, prev) => {
  if (next > prev && refRange.value >= CELL_NUM) useSecondsState.value += 1
  else if (next < prev && refRange.value < CELL_NUM) useSecondsState.value -= 1
  refRange.value = refRange.value === CELL_NUM ? 0 : CELL_NUM
})

function clickHandle (seconds) {
  viewValue.value = setSeconds(viewValue.value, seconds)
  addCount.value()
}
</script>

<style scoped>

</style>