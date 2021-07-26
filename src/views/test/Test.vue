<template lang="pug">
h1 test
button(@click="handle") click trigger popper
a-popper(v-model:visible="visible" :targetEl="targetEl")
  h2(@click="clickHandle") hello
a-popper(v-model:visible="show" :targetEl="targetElH2")
  h3 world
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
      show: false,
      targetEl: null,
      el: null,
      targetElH2: null,
    })

    function handle (el) {
      state.targetEl = el.target
      state.visible = !state.visible
    }

    function clickHandle (el) {
      state.targetElH2 = el.target
      state.show = !state.show
    }

    return {
      ...toRefs(state),
      handle,
      clickHandle,
    }
  },
}
</script>

<style scoped>

</style>