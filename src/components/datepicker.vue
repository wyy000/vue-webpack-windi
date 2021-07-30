<template lang="pug">
div(class="mx-auto w-70 flex flex-col divide-y")
  div(class="mx-auto h-10 flex items-center")
    svg(viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer fill-current hover:text-fuchsia-600" @click="viewDate = addMonths(viewDate, -12)")
      path(d="M11.828 12l2.829 2.828-1.414 1.415L9 12l4.243-4.243 1.414 1.415L11.828 12z")
    svg(viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer fill-current hover:text-fuchsia-600" @click="viewDate = addMonths(viewDate, -1)")
      path(d="M9 12l4-4v8z")
    span(class="flex-1") {{refYear}} 年 {{refMonth + 1}} 月
    svg(viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer fill-current hover:text-fuchsia-600" @click="viewDate = addMonths(viewDate, 1)")
      path(d="M14 12l-4 4V8z")
    svg(viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer fill-current hover:text-fuchsia-600" @click="viewDate = addMonths(viewDate, 12)")
      path(d="M12.172 12L9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z")
  div(class="mx-auto w-70 grid grid-cols-7")
    div(v-for="it of week" class="h-10 items-center justify-center flex") {{it}}
    button(v-for="it of preDays[0]" class="date-btn" @click="chooseDay(preDays[1] + it - 1, -1)") {{preDays[1] + it - 1}}
    button(v-for="it of curDays[0]" :class="['w-10 h-10 flex items-center cursor-pointer justify-center border border-white', curDateOfMonthStyle(it === curDays[1])]" @click="chooseDay(it)") {{it}}
    button(v-for="it of nextDays[0]" class="date-btn" @click="chooseDay(it, 1)") {{it}}
</template>

<script>
import {computed, ref, watch} from 'vue'
import {addMonths, isEqual, getDate, getDay, startOfMonth, subDays} from 'date-fns'
import {format} from '@/utils'

const CELL_NUMS = 42

export default {
  emit: ['update'],

  props: {
    modelValue: {
      type: Date,
      default: () => (new Date()),
    },
  },

  setup (props, {emit}) {
    const week = ['日', '一', '二', '三', '四', '五', '六']
    const days = [31, 28, 31, 30, 31, 30, 31, 30, 30, 31, 30, 31]

    const viewDate = ref(props.modelValue ?? new Date())
    const refYear = computed(() => viewDate.value.getFullYear())
    const refMonth = computed(() => viewDate.value.getMonth())

    const curDays = computed(() => [days[refMonth.value], isEqual(props.modelValue, viewDate.value) ? getDate(viewDate.value) : null])
    const preDays = ref([0, 0])
    const nextDays = ref([0, 1])

    watch(() => props.modelValue, value => value && (viewDate.value = value), {immediate: true})

    watch(() => [refYear.value, refMonth.value], ([year, month]) => {
      days[1] = month === 1 && (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28
    }, {immediate: true})

    watch(() => viewDate.value, value => {
      const startMonth = startOfMonth(value)
      preDays.value[0] = getDay(startMonth) % 7
      preDays.value[1] = getDate(subDays(startMonth, preDays.value[0]))
      nextDays.value[0] = CELL_NUMS - preDays.value[0] - curDays.value[0]
    }, {immediate: true})

    async function chooseDay (day, month = 0) {
      emit('update:modelValue', new Date(refYear.value, refMonth.value + month, day))
    }

    function curDateOfMonthStyle (checked) {
      return checked ? 'text-white border-fuchsia-600 bg-fuchsia-600' : 'bg-white text-blue-gray-900 hover:border-fuchsia-600 hover:text-fuchsia-600'
    }

    return {
      week,
      viewDate,
      preDays,
      curDays,
      nextDays,
      refYear,
      refMonth,

      curDateOfMonthStyle,
      chooseDay,
      format,

      addMonths,
    }
  },
}
</script>

<style>
.date-btn {
  @apply w-10 h-10 flex items-center justify-center text-blue-gray-500 bg-white border border-white hover:border-fuchsia-600 hover:text-fuchsia-600 cursor-pointer;
}
</style>
