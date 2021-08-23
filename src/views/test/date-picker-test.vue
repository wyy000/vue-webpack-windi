<template lang="pug">
div(class="p-4 flex")
  date-time-picker(v-model="value" precision="s" class="justify-center border border-color-[#c026d3]")
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