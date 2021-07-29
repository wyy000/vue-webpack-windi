<template lang="pug">
h1 {{formatVal}}
date-picker(v-model="value")
</template>

<script>
import {computed, ref} from 'vue'
import DatePicker from '@/components/datepicker.vue'
import {format} from '@/utils'

export default {
  components: {
    DatePicker,
  },

  setup () {
    const value = ref(null)
    const formatVal = computed(() => format(value.value))

    return {
      value,
      formatVal,
    }
  }
}
</script>

<style scoped>

</style>