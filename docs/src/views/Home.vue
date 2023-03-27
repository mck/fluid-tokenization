<script setup lang="ts">
  import TypescalesPreview from '../components/visualization/TypescalesPreview.vue'
  import {useTypescalesStore} from '../stores/typescales'

  const typescales = useTypescalesStore();

</script>

<template>
  <div class="mt-3">
    <TypescalesPreview />
  </div>
</template>

<style scoped>
</style>
