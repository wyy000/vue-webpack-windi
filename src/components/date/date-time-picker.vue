<template lang="pug">
div(class="p-2 mx-auto flex flex-col")
  div(class="p-2 flex")
    date-precision(v-model:precision="status" v-model:value="viewValue" :count="count" :origin-precision="precision" class="flex-1")
    div(class="flex items-center")
      svg(viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer fill-current hover:text-fuchsia-600" @click="pageState--")
        path(d="M9 12l4-4v8z")
      svg(viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer fill-current hover:text-fuchsia-600" @click="pageState++")
        path(d="M14 12l-4 4V8z")
  date-container
</template>

<script setup>
import {defineProps, provide, reactive, ref, toRefs} from 'vue'

import DateContainer from '@/components/date/date-container.vue'
import DatePrecision from '@/components/date/date-precision.vue'
import {getMinutes, getSeconds} from "date-fns"

const props = defineProps({
  modelValue: {
    type: Date,
    default: () => ({}),
  },
  // ['Y', 'M', 'D', 'h', 'm', 's']
  precision: {
    type: String,
    default: 'D',
  },
})

const state = reactive({
  status: props.precision && 'D',
  viewValue: props.modelValue ?? new Date(),
  count: 0,
  addCount,
})
const pageState = ref(0)

provide('useDateState', state)
provide('useTurnPageState', pageState)

const useMinutesState = ref(0)
const useSecondsState = ref(0)

provide('useMinutesState', useMinutesState)
provide('useSecondsState', useSecondsState)

function addCount () {
  state.count += 1
}

const {status, viewValue, count} = toRefs(state)
</script>

<style scoped>

</style>