<template lang="pug">
div(@click.stop="")
  slot(v-if="show")
</template>

<script>
import {defineComponent, onBeforeUnmount, watch} from 'vue'
import {createPopper} from '@popperjs/core'
import {addClickAway, removeClickAway} from '@/utils'

export default defineComponent({
  emits: ['update:show'],

  props: {
    targetEl: {
      type: HTMLElement,
      required: true,
    },
    el: {
      type: HTMLElement,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },

  setup (props, {emit}) {
    const baseOptions = {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [10, 20],
          },
        },
      ],
    }

    watch(() => props.show, (value) => {
      if (value && props.el && props.targetEl) {
        createPopper(props.targetEl, props.el, Object.assign(baseOptions, props.options))
      }
    })

    let _id = addClickAway(e => {
      if (e.target !== props.targetEl) emit('update:show', false)
    })

    onBeforeUnmount(() => removeClickAway(_id))

    return {}
  },
})
</script>
