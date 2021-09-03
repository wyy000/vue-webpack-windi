<template lang="pug">
h1 App Page
div.space-x-2
  tag-button(v-for="it of twoLevel")
    router-link(:to="`/app/${it.path}`") {{it.name}}
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
    const twoLevel = level.find(ro => ro.path === '/app').children

    return {
      twoLevel,
    }
  },
}
</script>