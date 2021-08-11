<template lang="pug">
button(@click="changeMode") {{refContent}}
</template>

<script>
import {computed} from 'vue'

import {getYear, getMonth, getDate, getHours, getMinutes, getSeconds} from 'date-fns'

export default {
  emit: ['update:precision'],

  props: {
    precision: {
      type: String,
      default: 'D',
    },
    value: {
      type: Date,
      require: true,
    },
  },

  setup (props, {emit}) {
    const STACK = [
      ['Y', getYear, '年'],
      ['M', getMonth, '月'],
      ['D', getDate, '日'],
      ['h', getHours, '时'],
      ['m', getMinutes, '分'],
      ['s', getSeconds, '秒']
    ]

    function changeMode () {
      const index = STACK.findIndex(it => it[0] === props.precision)
      index && emit('update:precision', STACK[index - 1][0])
    }

    const refContent = computed(() => {
      const index = STACK.findIndex(it => it[0] === props.precision)
      let str = ''
      if (index) {
        let i = 0
        while (index > i) {
          str += `${STACK[i][1](props.value) + (STACK[i][0] === 'M' ? 1 : 0)} ${STACK[i][2]} `
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
