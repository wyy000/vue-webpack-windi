<template lang="pug">
div(v-show="expanded" class="absolute left-1/2 -translate-x-1/2 w-3/5 overflow-hidden transform transition-all duration-300 ease-in-out")
  div(class="mx-auto p-0.5 shadow-md bg-white flex flex-wrap rounded-sm transition-all ease-in-out duration-250 transform hover:translate-y-[3px] hover:shadow-lg")
    router-link(v-for="it of level" :to="it.path" class="flex-grow flex-shrink-0 flex-nowrap text-[#24292e] text-base rounded-sm background-opacity-50 m-0.5 py-4 px-10 border" :style="it.style") {{it.name}}
  div(class="w-12 h-10 mb-4 shadow-md mx-auto flex justify-center items-center" style="border-bottom-left-radius: 100%; border-bottom-right-radius: 100%")
    svg(viewBox="0 0 24 24" width="20" height="20" class="text-[#24292e] cursor-pointer" @click="expanded = !expanded")
      path(d="M9.342 18.782l-1.931-.518.787-2.939a10.988 10.988 0 0 1-3.237-1.872l-2.153 2.154-1.415-1.415 2.154-2.153a10.957 10.957 0 0 1-2.371-5.07l1.968-.359C3.903 10.812 7.579 14 12 14c4.42 0 8.097-3.188 8.856-7.39l1.968.358a10.957 10.957 0 0 1-2.37 5.071l2.153 2.153-1.415 1.415-2.153-2.154a10.988 10.988 0 0 1-3.237 1.872l.787 2.94-1.931.517-.788-2.94a11.072 11.072 0 0 1-3.74 0l-.788 2.94z")
div(v-show="!expanded" class="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-8 shadow-md mx-auto flex justify-center items-center" @click="expanded = !expanded")
  svg(viewBox="0 0 24 24" width="24" height="24" class="cursor-pointer text-white")
    path(d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor")
header
  div(class="h-10 bg-[#24292e]")
router-view
</template>

<script>
import {reactive, toRefs} from 'vue'
import {level} from '@/views/index.ts'
import {randomColor} from '@/utils'
import TagButton from '@/components/tag-button.vue'

export default {
  components: {
    TagButton,
  },

  setup () {
    const state = reactive({
      expanded: true,
    })
    level.forEach(it => it.style = {'border-color': randomColor()})

    return {
      ...toRefs(state),
      level,
    }
  },
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
  font-size: 13px;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  position: relative;
  //background: #24292e;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
