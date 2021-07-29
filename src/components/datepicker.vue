<template lang="pug">
div(class="flex flex-col divide-y")
  div.flex
    svg(viewBox="0 0 24 24" width="24" height="24" @click="viewDate = addMonths(viewDate, -12)")
      path(d="M11.828 12l2.829 2.828-1.414 1.415L9 12l4.243-4.243 1.414 1.415L11.828 12z")
    svg(viewBox="0 0 24 24" width="24" height="24" @click="viewDate = addMonths(viewDate, -1)")
      path(d="M9 12l4-4v8z")
    span.flex-1 {{refYear}}年{{refMonth + 1}}月
    svg(viewBox="0 0 24 24" width="24" height="24" @click="viewDate = addMonths(viewDate, 1)")
      path(d="M14 12l-4 4V8z")
    svg(viewBox="0 0 24 24" width="24" height="24" @click="viewDate = addMonths(viewDate, 12)")
      path(d="M12.172 12L9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z")
  div(class="grid grid-cols-7")
    div(v-for="it of week" class="flex") {{it}}
    button(v-for="it of preDays[0]" class="flex" @click="chooseDay(preDays[1] + it, -1)") {{preDays[1] + it}}
    button(v-for="it of curDays" class="flex" @click="chooseDay(it)") {{it}}
    button(v-for="it of nextDays[0]" class="flex" @click="chooseDay(it, 1)") {{it}}
</template>

<script>
import {computed, ref, watch} from 'vue'
import {addMonths, endOfMonth, startOfMonth, subDays, getDay} from 'date-fns'
import {format} from '@/utils'

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

    const curDays = computed(() => days[refMonth.value])
    const preDays = ref([0, 0])
    const nextDays = ref([0, 1])

    watch(() => [refYear.value, refMonth.value], ([year, month]) => {
      days[1] = month === 1 && (year % 4 === 0) && (year % 100 !==0 || year % 400 === 0) ? 29 : 28
    }, {immediate: true})

    watch(() => viewDate.value, value => {
      nextDays.value[0] = getDay(endOfMonth(value)) === 6 ? 7 : 6 - getDay(endOfMonth(value)) + 1
      preDays.value[0] = !getDay(startOfMonth(value)) ? 0 : (7 - getDay(startOfMonth(value)) + 1) % 7
      preDays.value[1] = subDays(value, preDays.value[0] - 1).getDate()
    }, {immediate: true})

    function chooseDay (day, month = 0) {
      emit('update:modelValue', new Date(refYear.value, refMonth.value + month, day))
    }

    return {
      week,
      viewDate,
      preDays,
      curDays,
      nextDays,
      refYear,
      refMonth,

      chooseDay,
      format,

      addMonths,
    }
  },
}
</script>
