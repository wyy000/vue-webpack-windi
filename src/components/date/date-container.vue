<template lang="pug">
div(class="w-100 h-80 flex flex-wrap")
  table-year(v-if="status === 'Y'")
  table-month(v-if="status === 'M'")
  table-day(v-if="status === 'D'")
  table-hour(v-if="status === 'h'")
  table-minute(v-if="status === 'm'")
  table-second(v-if="status === 's'")
</template>

<script setup>
import {defineProps, inject, toRefs} from 'vue'

import TableYear from '@/components/date/container/table-year.vue'
import TableMonth from '@/components/date/container/table-month.vue'
import TableDay from '@/components/date/container/table-day.vue'
import TableHour from '@/components/date/container/table-hour.vue'
import TableMinute from '@/components/date/container/table-minute.vue'
import TableSecond from '@/components/date/container/table-second.vue'

const props = defineProps({
  range: {
    type: Number,
  },
  mode: {
    type: String,
    default: 'D',
  },
})

const {status, viewValue} = toRefs(inject('useDateState'))
</script>

<style scoped>

</style>