<script setup lang="ts">
import { ref } from "vue";
import TypescalesChart from '../components/visualization/TypescalesChart.vue';
import { useTypescalesStore } from '../stores/typescales';

const typescales = useTypescalesStore();

</script>

<template>
  <TypescalesChart />
</template>

<style scoped>
</style>