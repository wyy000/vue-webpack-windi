<template lang="pug">
// 如果不定义ref, 无法获取解析的dom, 只能获取配置对象
div(ref="el")
  slot
</template>

<script>
import {defineComponent, nextTick, onBeforeUnmount, onMounted, reactive, toRefs, watch} from 'vue'
import {createPopper} from '@popperjs/core'
import {addClickAway, removeClickAway} from '@/utils'

export default defineComponent({
  emits: ['update:show'],

  props: {
    targetEl: {
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
            offset: [],
          },
        },
      ],
    }

    const state = reactive({
      el: null,
    })

    let popper
    let appModel

    onMounted(() => appModel = document.getElementById('appModel'))

    let _id = addClickAway(e => e.target !== props.targetEl && !appModel?.contains(e.target) && emit('update:show', false), state.el)

    watch(() => props.show, async (value) => {
      if (value) {
        await nextTick()
        popper = createPopper(props.targetEl, state.el, Object.assign(baseOptions, props.options))
      }
      else {
        closePopper()
      }
    }, {immediate: true})

    onBeforeUnmount(() => closePopper())

    function closePopper () {
      removeClickAway(_id)
      popper && popper.destroy()
      popper = undefined
    }

    return {
      ...toRefs(state),
    }
  },
})
</script>
