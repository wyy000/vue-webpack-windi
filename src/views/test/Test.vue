<template lang="pug">
h1 test
button(@click="handle") click trigger popper
a-popper(v-model:visible="visible" :targetEl="targetEl")
  h2 world
</template>

<script>
import {reactive, toRefs} from 'vue'
import APopper from '@/components/a-popper.vue'

export default {
  components: {
    APopper,
  },

  setup (props) {
    const state = reactive({
      visible: false,
      targetEl: null,
      el: null,
    })

    function handle (el) {
      state.targetEl = el.target
      state.visible = !state.visible
    }

    return {
      ...toRefs(state),
      handle,
    }
  },
}
</script>

<style scoped>

</style>