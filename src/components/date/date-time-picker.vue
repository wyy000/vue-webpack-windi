<template lang="pug">
div(class="mx-auto flex flex-col divide-y")
  div(class="flex")
    date-precision(v-model:precision="status" :value="viewValue")
    div
      svg(viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer fill-current hover:text-fuchsia-600" @click="viewDate = addMonths(viewDate, -1)")
        path(d="M9 12l4-4v8z")
      svg(viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer fill-current hover:text-fuchsia-600" @click="viewDate = addMonths(viewDate, 1)")
        path(d="M14 12l-4 4V8z")
  date-container()
</template>

<script setup>
import {defineComponent, defineProps, provide, reactive, toRefs} from 'vue'

import DateContainer from '@/components/date/date-container.vue'
import DatePrecision from '@/components/date/date-precision.vue'

defineComponent({
  DateContainer,
  DatePrecision,
})

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
  status: props.precision,
  viewValue: props.modelValue ?? new Date(),
})

provide('useDateState', state)

const {status, viewValue} = toRefs(state)
</script>

<style scoped>

</style>