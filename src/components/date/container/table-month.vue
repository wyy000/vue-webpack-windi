<template lang="pug">
h1 month
</template>

<script setup>
import {defineEmits, inject} from 'vue'

const emit = defineEmits(['update:modelValue'])

const dateState = inject('useDateState')
</script>

<style scoped>

</style>