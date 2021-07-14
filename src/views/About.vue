<template lang="pug">
h1(class="text-fuchsia-400 text-center") windicss
tag-button(text="测试" @click="handle")
</template>

<script>
import {reactive, toRefs, watch} from 'vue'
import router from '@/router/index'

import TagButton from '@/components/tag-button.vue'


export default {
  components: {
    TagButton,
  },

  setup (props) {
    const state = reactive({
      router: 123,
    })

    watch(() => state.router, value => {
      console.log(this)
    })

    function handle () {
      console.log(this, router)
      router.push('/')
    }

    return {
      ...toRefs(state),

      handle,
    }
  },
}
</script>
