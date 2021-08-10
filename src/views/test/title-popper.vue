<template lang="pug">
popper(:target-el="targetEl" v-model:show="show")
  div(v-if="show" @click.stop="")
    span I'm a title popper. And
    button(@click.stop="$emit('update')") click me
    span is close.
</template>

<script>
import {defineComponent, onBeforeUnmount, ref, watch} from 'vue'
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

    // ref监听.value
    watch(() => show.value, value => !value && emit('update'), {immediate: true})

    onBeforeUnmount(() => emit('update'))

    return {
      show,
    }
  },
})
</script>
