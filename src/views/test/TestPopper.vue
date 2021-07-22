<template lang="pug">
h1(@click="handle") {{show ? 'close-popper' : 'open-popper'}}
popper(:target-el="ref" :el="el" v-model:show="show")
  // 如果不定义ref, 无法获取解析的dom, 只能获取配置对象
  h1(ref="el" class="border border-color-[#24292e]") 我是一个popper
    div(@click="show = false") 12345
div(class="h-full bg-yellow")
</template>

<script>
import {reactive, toRefs} from 'vue'
import Popper from '@/components/popper.vue'

export default {
  components: {
    Popper,
  },

  setup (props) {
    const state = reactive({
      ref: null,
      el: null,
      show: false,
    })

    function handle (el) {
      state.ref = el.target
      state.show = !state.show
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