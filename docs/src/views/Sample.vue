<script setup lang="ts">
import { ref } from "vue";
import { useTypescalesStore } from '../stores/typescales';
import TypescalesSample from "../components/visualization/TypescalesSample.vue";

const typescales = useTypescalesStore();

</script>

<template>
  <TypescalesSample />
</template>

<style scoped>
</style>