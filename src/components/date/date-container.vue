<template lang="pug">
div(class="flex")
  Container.TableYear(v-if="status === 'Y'")
  Container.TableMonth(v-if="status === 'M'")
  Container.TableDay(v-if="status === 'D'")
  Container.TableHour(v-if="status === 'h'")
  Container.TableMinute(v-if="status === 'm'")
  Container.TableSecond(v-if="status === 's'")
</template>

<script setup>
import {defineProps, inject, reactive, ref, toRefs} from 'vue'
import * as Container from '@/components/date/container/index.ts'

const {status, viewValue} = inject('useDateState')

const props = defineProps({
  range: {
    type: Number,
  },
  mode: {
    type: String,
    default: 'D',
  },
})
</script>

<style scoped>

</style>