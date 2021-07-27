<template lang="pug">
h1 Select
a-select(v-model="value" :data="data")
</template>

<script>
import {reactive, toRefs} from 'vue'
import ASelect from '@/components/a-select.vue'

export default {
  components: {
    ASelect,
  },

  setup () {
    const state = reactive({
      value: '',
      data: Array.from({length: 25}).map((it, i) => [i, i])
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>
