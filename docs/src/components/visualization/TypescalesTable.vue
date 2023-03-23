<script setup lang="ts">
const props = defineProps<{
    typescales: StepSettings[][]
}>()
</script>

<template>
    <table class="table">
      <thead>
        <tr>
          <th>Step</th>
          <th v-for="(item, index) in typescales[0].slice(1, -1)" :key="index">{{ item.breakpoint }}px</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(scale, i) in typescales" :key="i">
          <td>{{ scale[0].step }}</td>
          <td v-for="item in scale.slice(1, -1)" class="text-right">{{ item.fontSize }}px</td>
        </tr>
      </tbody>
    </table>
</template>