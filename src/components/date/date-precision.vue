<template lang="pug">
button(@click="changeMode") {{refContent}}
</template>

<script>
import {computed, inject, watch} from 'vue'

import {addYears, addMonths, addDays, addHours, addMinutes, addSeconds, getYear, getMonth, getDate, getHours, getMinutes, getSeconds} from 'date-fns'

export default {
  emit: ['update:precision', 'update:value'],

  props: {
    precision: {
      type: String,
      default: 'D',
    },
    value: {
      type: Date,
      require: true,
    },
    count: {
      type: Number,
      require: true,
    },
    originPrecision: {
      type: String,
    },
  },

  setup (props, {emit}) {
    const STACK = [
      ['Y', '年', getYear, addYears],
      ['M', '月', getMonth, addMonths],
      ['D', '日', getDate, addDays],
      ['h', '时', getHours, addHours],
      ['m', '分', getMinutes, addMinutes],
      ['s', '秒', getSeconds, addSeconds]
    ]

    watch(() => props.count, value => {
      const index = STACK.findIndex(it => it[0] === props.precision)
      // TODO
      // index && emit('update:precision', STACK[index + 1][0])
      index > -1 && emit('update:precision', props.originPrecision)
      // index > -1 && emit('update:precision', 'D')
    })

    function changeMode () {
      const index = STACK.findIndex(it => it[0] === props.precision)
      index && emit('update:precision', STACK[index - 1][0])
    }

    const useTurnPageState = inject('useTurnPageState')
    const minutesState = inject('useMinutesState')
    const secondsState = inject('useSecondsState')

    watch(() => useTurnPageState.value, (next, prev) => {
      const num = next - prev
      const index = STACK.findIndex(it => it[0] === props.precision)
      if (props.precision === 'Y') {
        emit('update:value', STACK[index][3](props.value, num * 10))
      }
      else if (props.precision !== 'm' && props.precision !== 's') {
        emit('update:value', STACK[index - 1][3](props.value, num))
      }
    })

    watch(() => [minutesState.value, secondsState.value], ([nextMinutes, nextSeconds], [prevMinutes, prevSeconds]) => {
      const num = nextMinutes - prevMinutes || nextSeconds - prevSeconds
      const index = STACK.findIndex(it => it[0] === props.precision)
      emit('update:value', STACK[index - 1][3](props.value, num))
    })

    const refContent = computed(() => {
      const index = STACK.findIndex(it => it[0] === props.precision)
      let str = ''
      if (index) {
        let i = 0
        while (index >= i) {
          str += `${STACK[i][2](props.value) + (STACK[i][0] === 'M' ? 1 : 0)} ${STACK[i][1]} `
          i++
        }
      }
      else {
        const curYear = getYear(props.value)
        str = `${curYear - curYear % 10} - ${curYear - curYear % 10 + 9}`
      }
      return str
    })

    return {
      STACK,
      refContent,

      changeMode,
    }
  }
}
</script>
