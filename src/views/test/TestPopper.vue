<template lang="pug">
h1(@click="handle") trigger-popper
</template>

<script>
import {inject, reactive, toRefs} from 'vue'
import Popper from '@/components/popper.vue'
import TitlePopper from '@/views/test/title-popper.vue'

export default {
  components: {
    Popper,
    TitlePopper,
  },

  setup (props) {
    const state = reactive({
      el: null,
    })

    const globalModel = inject('globalModel')
    const {show: showPopper, hide: hidePopper} = globalModel.registerComp('title-popper', TitlePopper)

    function handle (el) {
      showPopper({
        props: {
          targetEl: el.target,
        },
        listeners: {
          update (value) {
            hidePopper()
          },
        },
      })
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