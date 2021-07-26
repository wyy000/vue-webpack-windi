<template lang="pug">
teleport(v-if="visible" to="#appModel")
  div(ref="comp" @click.stop="")
    slot
</template>

<script>
import {nextTick, reactive, toRefs, watch} from 'vue'
import {createPopper} from '@popperjs/core'
import {addClickAway, removeClickAway} from '@/utils'

export default {
  emits: ['update:visible'],

  props: {
    targetEl: {
      type: HTMLElement,
      required: true,
    },
    visible: {
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

    const state = reactive({
      comp: null
    })

    let _id

    watch(() => props.visible, async value => {
      if (value) {
        await nextTick()
        createPopper(props.targetEl, state.comp, Object.assign(baseOptions, props.options))
        _id = addClickAway(async (e) => {
          e.target !== props.targetEl && emit('update:visible', false)
        })
      }
      else {
        removeClickAway(_id)
      }
    }, {immediate: true})

    return {
      ...toRefs(state),
    }
  },
}
</script>
