<template lang="pug">
button(v-for="(_, i) of 24" class="flex-grow flex-shrink-0 p-4 cursor-pointer" style="flex-basis: 16%;" @click="clickHandle(i)") {{i}}
</template>

<script setup>
import {inject, toRefs} from 'vue'
import {setHours} from 'date-fns'

const {viewValue, addCount} = toRefs(inject('useDateState'))

function clickHandle (hour) {
  viewValue.value = setHours(viewValue.value, hour)
  addCount.value()
}
</script>