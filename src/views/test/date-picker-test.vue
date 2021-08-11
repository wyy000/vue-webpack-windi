<template lang="pug">
div
  date-time-picker(v-model="value")
</template>

<script>
import {reactive, toRefs} from 'vue'

import DateTimePicker from '@/components/date/date-time-picker.vue'

export default {
  components: {
    DateTimePicker,
  },

  setup (props) {
    const state = reactive({
      value: null,
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style scoped>

</style>