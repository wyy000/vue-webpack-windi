<template lang="pug">
h1 test-index
div.space-x-2
  tag-button(v-for="it of twoLevel")
    router-link(:to="`/test/${it.path}`") {{it.name}}
router-view
</template>

<script>
import TagButton from '@/components/tag-button.vue'
import {level} from '@/views/index'

export default {
  components: {
    TagButton,
  },

  setup () {
    const twoLevel = level.find(ro => ro.path === '/test').children

    return {
      twoLevel,
    }
  },
}
</script>

<style scoped>

</style>