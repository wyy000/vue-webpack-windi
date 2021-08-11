<template lang="pug">
div(class="flex flex-col")
  div(class="flex")
    date-precision(v-mode)
  div()
</template>

<script>
import DatePrecision from '@/components/date/date-precision.vue'

export default {
  components: {
    DatePrecision,
  },
}
</script>

<style scoped>

</style>