<template lang="pug">
div(class="flex justify-between")
  button(@click="changeMode(2)" class="cursor-pointer") {{refContent}}
  button(v-if="STACK.findIndex(it => it[0] === originPrecision) >= 3" @click="changeMode(3)" class="cursor-pointer")
    span(v-for="[str, status] of refTime" :class="[{'text-fuchsia-500': status === precision}]") {{str}}
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
      ['h', ':', getHours, addHours],
      ['m', ':', getMinutes, addMinutes],
      ['s', ' ', getSeconds, addSeconds]
    ]

    watch(() => props.count, value => {
      const index = STACK.findIndex(it => it[0] === props.originPrecision)
      // TODO 现不支持倒序使用
      index > -1 && emit('update:precision', index > 2 ? 'D' : props.originPrecision)
    })

    function changeMode (head) {
      let index = STACK.findIndex(it => it[0] === props.precision)
      if (head === 2 && index > head || head === 3 && index < head) {
        index = head
      }
      else {
        index = head > 2 ? index + 1 : index - 1
      }

      index > -1 && index < STACK.length && index < STACK.length && emit('update:precision', STACK[index][0])
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

    const refTime = computed(() => {
      const index = STACK.findIndex(it => it[0] === props.originPrecision)
      let arr = []
      if (index) {
        let i = 3
        while (index >= i) {
          arr.push([`${String(STACK[i][2](props.value) + (STACK[i][0] === 'M' ? 1 : 0)).padStart(2, '0')} ${STACK[i][1]} `, STACK[i][0]])
          i++
        }
      }
      return arr
    })

    const refContent = computed(() => {
      let index = STACK.findIndex(it => it[0] === props.precision)
      index = index >= 2 ? 2 : index
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
      refTime,

      changeMode,
    }
  }
}
</script>
