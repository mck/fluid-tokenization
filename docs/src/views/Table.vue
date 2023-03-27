<script setup lang="ts">
import TypescalesTable from '../components/visualization/TypescalesTable.vue';
import { useTypescalesStore } from '../stores/typescales';

const typescales = useTypescalesStore();
console.log(typescales);

</script>

<template>
  <TypescalesTable v-if="typescales" :typescales="typescales.typescales" />
</template>

<style scoped>
</style>