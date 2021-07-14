<template lang="pug">
div(class="w-3/5 mb-4 mx-auto p-0.5 shadow-md flex flex-wrap rounded-sm transition-all ease-in-out duration-250 transform hover:translate-y-[3px] hover:shadow-lg")
  //button(v-for="it of level" class="flex-grow flex-shrink-0 flex-nowrap m-0.5 text-white rounded-sm background-opacity-50 flex" :style="it.style")
  router-link(v-for="it of level" :to="it.path" class="flex-grow flex-shrink-0 flex-nowrap text-[#24292e] text-base rounded-sm background-opacity-50 m-0.5 py-4 px-10 border" :style="it.style") {{it.name}}
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
    const state = reactive({})
    console.log(level)
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
