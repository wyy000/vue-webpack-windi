<template lang="pug">
h1 day
</template>

<script>
import {inject} from 'vue'

export default {
  setup () {
    const dateState = inject('useDateState')
  }
}


</script>

<style scoped>

</style>