<template lang="pug">
button(:class="['rounded-full border border-1 border-opacity-50', refStyle]" :style="comStyle" @click="$emit('click')")
  slot
  template(v-if="!Object.keys($slots).length") {{text}}
</template>

<script>
import {computed, defineComponent} from 'vue'

export default defineComponent({
  emits: ['click'],

  props: {
    modelValue: {
      type: String,
      default: null,
    },
    fill: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
    color: {
      type: String,
      default: '#c026d3',
    },
    text: {
      type: String,
      default: 'test text',
    },
  },

  setup (props) {
    const refStyle = computed(() => {
      return {
        sm: 'py-px p-1 text-xs',
        md: 'py-0.5 p-2 text-sm',
        lg: 'py-2 p-3 text-base',
      }[props.size]
    })

    const comStyle = computed(() => {
      const color = (/^#/.test(props.color)) ? `${props.color}` : `rgb(${props.color})`
      return props.fill ? `background: ${color}; color: white;`
        : `background: white; color: ${color}; border-color: ${color};`
    })

    return {
      refStyle,
      comStyle,
    }
  },
})
</script>

<style scoped>
</style>