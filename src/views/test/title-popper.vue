<template lang="pug">
popper(:target-el="targetEl" v-model:show="show")
  div(v-if="show")
    span I'm a title popper. And
    button(@click="$emit('update')") click me
    span is close.
</template>

<script>
import {defineComponent, onBeforeUnmount, onMounted, ref, watch} from 'vue'
import Popper from '@/components/popper.vue'

export default defineComponent({
  emits: ['update'],

  components: {
    Popper,
  },

  props: {
    targetEl: {
      type: HTMLElement,
      required: true,
    },
  },

  setup (props, {emit}) {
    const show = ref(true)

    watch(() => show, value => {
      console.log(123, show, !value)
      !value && emit('update')
    }, {immediate: true})

    onBeforeUnmount(() => {
      console.log('onBeforeUnmount')
      emit('update')
    })

    return {
      show,
    }
  },
})
</script>
