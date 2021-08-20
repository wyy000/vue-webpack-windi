<template lang="pug">
button(v-for="(_, i) of CELL_NUM" class="flex-grow flex-shrink-0 p-4 cursor-pointer" style="flex-basis: 16%;" @click="clickHandle(refRange + i)") {{refRange + i}}
</template>

<script setup>
import {inject, ref, toRefs, watch} from 'vue'
import {getMinutes, setMinutes} from 'date-fns'

const CELL_NUM = 30

const {viewValue, addCount} = toRefs(inject('useDateState'))
const useTurnPageState = inject('useTurnPageState')
const useMinutesState = inject('useMinutesState')

const refRange = ref(getMinutes(viewValue.value) >= CELL_NUM ? CELL_NUM : 0)

watch(() => useTurnPageState.value, (next, prev) => {
  if (next > prev && refRange.value >= CELL_NUM) useMinutesState.value += 1
  else if (next < prev && refRange.value < CELL_NUM) useMinutesState.value -= 1
  refRange.value = refRange.value === CELL_NUM ? 0 : CELL_NUM
})

function clickHandle (minutes) {
  viewValue.value = setMinutes(viewValue.value, minutes)
  addCount.value()
}
</script>

<style scoped>

</style>