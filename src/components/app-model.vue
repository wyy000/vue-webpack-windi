<template lang="pug">
router-view
div(class="fixed z-[2] bottom-0 inset-x-0 h-0 flex justify-center items-end" id="appModel")
  component(v-if="currentComp" :is="globalModel[currentComp].component" v-bind="globalModel[currentComp].props" v-on="globalModel[currentComp].listeners")
</template>

<script>
import {markRaw, provide, ref} from 'vue'

export default {
  setup () {
    let globalModel = markRaw({})
    let currentComp = ref('')

    provide('globalModel', {
      registerComp: (name, component) => {
        if (!globalModel[name]) globalModel[name] = {component}

        return (name => ({
          show: ({props, listeners} = {}) => {
            currentComp.value = name
            globalModel[name].props = props
            globalModel[name].listeners = listeners
          },
          hide: () => {
            currentComp.value = ''
          },
        }))(name)
      }
    })

    return {
      globalModel,
      currentComp,
    }
  },
}
</script>

<style scoped>

</style>