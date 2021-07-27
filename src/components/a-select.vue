<template lang="pug">
span(ref="targetEl" @click.self="showOptions = true" class="select relative") {{refValue}}
  a-popper(v-model:visible="showOptions" :target-el="targetEl")
    ul(class="max-h-[50vh] border border-fuchsia-500 rounded-md overflow-auto")
      li(
        v-for="[key, name] of refOptions"
        class="min-w-30 bg-white border-none hover:bg-fuchsia-400 hover:text-white"
        @click.stop="selectHandle(key)"
      ) {{name ?? key}}
</template>

<script>
import {computed, reactive, toRefs} from 'vue'
import APopper from './a-popper'

export default {
  components: {
    APopper,
  },

  emits: ['update:modelValue', 'update:visible'],

  props: {
    modelValue: {
      type: [String, Boolean, Number],
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },

  setup (props, {emit}) {
    const state = reactive({
      targetEl: null,
      showOptions: false,
    })

    const refOptions = computed(() => props.data.map(it => it))

    const refValue = computed(() => {
      const item = refOptions.value.find(it => it[0] === props.modelValue)
      return item ? item[1] : '请选择'
    })

    function selectHandle (value) {
      emit('update:modelValue', value)
      state.showOptions = false
    }

    return {
      ...toRefs(state),
      refOptions,
      refValue,

      selectHandle,
    }
  },
}
</script>
